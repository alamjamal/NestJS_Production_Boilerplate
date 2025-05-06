import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User // Inject the User model
    ) {}
    async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        const user = await this.userModel.findOne<User>({
            where: { email: createUserDto.email }
        });
        if (user) {
            throw new HttpException('User already exists', 400);
        }
        return await this.userModel.create<User>({ ...createUserDto });
    }

    async findAll(): Promise<CreateUserDto[] | null> {
        const result = await this.userModel.findAll<User>({});
        return result;
    }

    async findOne(id: string): Promise<CreateUserDto | null> {
        const user = await this.userModel.findByPk<User>(id);
        // if (!user) {
        //   throw new NotFoundException(`User with ID ${id} not found`);
        // }

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<number> {
        const [affectedCount] = await this.userModel.update<User>(updateUserDto, {
            where: { id: id }
        });
        return affectedCount;
    }

    remove(id: string): Promise<number> {
        return this.userModel.destroy({
            where: { id: id }
        });
    }
}
