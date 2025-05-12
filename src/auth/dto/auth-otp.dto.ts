// src/otp/dto/otp.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class OtpDto {
    @ApiProperty({
        example: '7416815171',
        description: 'Mobile number (primary & foreign key)'
    })
    mobile: string;

    @ApiProperty({
        example: '1234',
        description: '4-digit OTP code'
    })
    @IsString()
    @Length(4, 4, { message: 'OTP code must be exactly 4 digits' })
    @Matches(/^[0-9]{4}$/)
    code: string;

    @ApiProperty({
        type: String,
        format: 'date-time',
        example: new Date().toISOString(),
        description: 'When this OTP expires'
    })
    expiresAt: Date;

    @ApiProperty({
        example: false,
        description: 'Whether this OTP has already been used'
    })
    isUsed: boolean;
}
