import { Body, Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from '../auth-guard/guards/auth.guard';
import { RequestType } from 'src/common/type/Request';
import { Request as ExpressRequest } from 'express';
import { PassportLocalGuard } from 'src/auth-guard/guards/local.guard';
import { UserDto } from 'src/user/dto/user-dto';
import { PassportJwtGuard } from 'src/auth-guard/guards/jwt.guard';
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

    // @UseGuards(PassportLocalGuard)
    // @Post('/user/verify-otp')
    // @ApiOperation({ summary: 'Send OTP' })
    // @ApiBody({ type: VerifyOtpDto })
    // @ApiOkResponse({})
    // @ApiCreatedResponse({})
    // @ApiBadRequestResponse({ description: 'Forbidden', type: ErrorResponseDto })
    // verifyOtp(@Body() dto: VerifyOtpDto) {
    //     return this.authService.verifyOtp(dto);
    // }

    @UseGuards(PassportLocalGuard)
    @Post('/user/verify-otp')
    @ApiOperation({ summary: 'Send OTP' })
    @ApiBody({ type: VerifyOtpDto })
    @ApiOkResponse({})
    @ApiCreatedResponse({})
    @ApiBadRequestResponse({ description: 'Forbidden', type: ErrorResponseDto })
    verifyOtp(@Request() request: ExpressRequest) {
        return this.authService.verifyOtp(request.user as UserDto);
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

    // @UseGuards(JwtAuthGuard)
    @UseGuards(PassportJwtGuard)
    @Get('/me')
    getCurrentUser(@Request() request: ExpressRequest) {
        return request.user as RequestType;
    }
}
