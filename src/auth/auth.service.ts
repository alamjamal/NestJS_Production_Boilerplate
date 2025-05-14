import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { OTP } from './model/auth.model';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserService } from '../user/user.service';
import { UserDto } from 'src/user/dto/user-dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

type PayloadType = {
    sub?: string; // user ID
    mobile?: string; // user mobile
    role?: string; // user role
};
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(OTP) private otpModel: typeof OTP,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async requestOtp(dto: CreateOtpDto) {
        const record = await this.otpModel.findOne({ where: { mobile: dto.mobile } });
        if (record) {
            if (record.expiresAt.getTime() > Date.now()) {
                const remainingTime = record.expiresAt.getTime() - Date.now();
                const remainingMinutes = Math.floor(remainingTime / (1000 * 60)).toString();
                const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000).toString();
                // OTP expired, allow sending a new one
                throw new BadRequestException(
                    `OTP already sent, please wait for ${remainingMinutes}::${remainingSeconds} minutes`
                );
            }
        }
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        // upsert an OTP record (new or overwrite previous)
        await this.otpModel.upsert({
            mobile: dto.mobile,
            code,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
            isUsed: false
        });

        // TODO: integrate with SMS gateway to send `code` to `dto.mobile`
        return code;
    }

    async verifyOtp(dto: VerifyOtpDto) {
        // 1) find OTP record
        const record = await this.otpModel.findOne({ where: { mobile: dto.mobile, code: dto.code } });
        if (!record) {
            throw new BadRequestException('Invalid OTP');
        }

        // 2) check expiry & usage
        if (record.isUsed) {
            throw new BadRequestException('OTP already used');
        }
        if (record.expiresAt.getTime() < Date.now()) {
            await this.otpModel.destroy({ where: { mobile: dto.mobile, code: dto.code } });
            throw new BadRequestException('OTP expired');
        }

        // 3) mark used
        record.isUsed = true;
        await record.save();

        // 4) find or create user
        let user: Partial<UserDto> = await this.userService.findByMobile(dto.mobile);
        if (!user) {
            user = await this.userService.create({ mobile: dto.mobile });
        }

        // 5) issue JWT
        const payload: PayloadType = { sub: user.id, mobile: user.mobile, role: user.role };
        const token = this.jwtService.sign(payload);

        return { accessToken: token };
    }
}
