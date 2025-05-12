import { CreateUserDto } from './create-user.dto';

import { PartialType, PickType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(PickType(CreateUserDto, ['name', 'password'] as const)) {}
