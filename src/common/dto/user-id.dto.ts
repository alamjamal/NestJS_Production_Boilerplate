// src/user/dto/user-id.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UserIdDto {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'User ID'
    })
    @IsUUID(4, { message: 'ID must be a valid UUID v4' })
    id: string;
}
