import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { OtpDto } from './dto/auth-otp.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
        return this.authService.requestOtp(type);
    }

    @Post('/user/verify-otp')
    @ApiOperation({ summary: 'Send OTP' })
    @ApiBody({ type: VerifyOtpDto })
    @ApiOkResponse({})
    @ApiCreatedResponse({})
    @ApiBadRequestResponse({ description: 'Forbidden', type: ErrorResponseDto })
    verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.authService.verifyOtp(dto);
    }

    @Post('/user/access-token')
    @ApiOperation({ summary: 'Get Access Token' })
    @ApiBody({ type: RefreshTokenDto })
    @ApiOkResponse({})
    @ApiCreatedResponse({})
    @ApiBadRequestResponse({ description: 'Forbidden', type: ErrorResponseDto })
    getAccessToken(@Body() dto: RefreshTokenDto) {
        return this.authService.generateAccessToken(dto.refreshToken);
    }

    @Post('/user/logout')
    @ApiOperation({ summary: 'Log Out ' })
    @ApiBody({ type: RefreshTokenDto })
    @ApiOkResponse({})
    @ApiCreatedResponse({})
    @ApiBadRequestResponse({ description: 'Forbidden', type: ErrorResponseDto })
    logOut(@Body() dto: RefreshTokenDto) {
        return this.authService.logout(dto.refreshToken);
    }
}
