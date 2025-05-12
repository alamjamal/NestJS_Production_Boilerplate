import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.to';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/user/request-otp')
    @ApiOperation({ summary: 'Send OTP' })
    @ApiBody({ type: CreateOtpDto })
    @ApiOkResponse({})
    @ApiCreatedResponse({})
    @ApiBadRequestResponse({ description: 'Forbidden', type: ErrorResponseDto })
    requestOtp(@Body() type: CreateOtpDto) {
        // return this.authService.requestOtp(type);
        return type;
    }

    // POST /auth/verify-otp
    @Post('/user/verify-otp')
    @ApiOperation({ summary: 'Send OTP' })
    @ApiBody({ type: VerifyOtpDto })
    @ApiOkResponse({})
    @ApiCreatedResponse({})
    @ApiBadRequestResponse({ description: 'Forbidden', type: ErrorResponseDto })
    verifyOtp(@Body() dto: VerifyOtpDto) {
        // return this.authService.verifyOtp(dto);
        return dto;
    }
}
