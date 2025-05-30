import { PickType } from '@nestjs/swagger';
import { UserDto } from './user-dto';

export class CreateUserDto extends PickType(UserDto, ['name', 'email', 'password', 'mobile', 'isActivate'] as const) {}
