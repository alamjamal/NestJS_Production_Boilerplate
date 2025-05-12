// src/otp/dto/create-otp.dto.ts
import { PartialType, PickType } from '@nestjs/swagger';
import { OtpDto } from './auth-otp.dto';

export class CreateOtpDto extends PartialType(PickType(OtpDto, ['mobile'] as const)) {}
