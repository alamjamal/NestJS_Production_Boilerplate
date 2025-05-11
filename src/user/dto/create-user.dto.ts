import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

//this is dto class we have to use class-validator only to validate the data here
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export enum UserRole {
    USER_READ = 'read',
    USER_WRITE = 'write',
    USER_READ_WRITE = 'read_write'
}

export class CreateUserDto {
    @ApiProperty({ example: 'john_doe', description: 'Name' })
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    name: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '7416815171', description: 'Mobile Number' })
    @Matches(/^[6-9]{1}[0-9]{9}$/, {
        message: 'Mobile number must be Valid Indian Number'
    })
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(10)
    mobile: string;

    @ApiProperty({ example: 'read', description: 'User Roles' })
    @IsEnum(UserRole)
    @IsNotEmpty()
    // @Matches(/^(read|write|read_write)$/, {
    //     message: 'Role must be one of the following: read, write, read_write'
    // })
    role: UserRole = UserRole.USER_READ; // Default role
}
