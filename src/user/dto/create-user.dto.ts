import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'john_doe', description: 'Username' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
