// It uses the sequelize-typescript library to define the model and its properties.
import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

// import { DataTypes } from 'sequelize';  // Core ORM (Model Definitions, Queries)

import { UserRole } from '../dto/create-user.dto';

@Table({
    timestamps: true,
    tableName: 'Users',
    underscored: true // Use snake_case for column names
})
export class User extends Model {
    //using ApiProperty to expose response to swagger
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'UUIDv7 Primary Key' })
    @Column({
        type: DataType.UUIDV4,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        validate: {
            isUUID: 4
        }
    })
    declare id: string;

    @ApiProperty({ example: 'john_doe', description: 'Name' })
    @Column({
        type: DataType.STRING(20),
        validate: { len: [2, 20] },
        allowNull: true
    })
    declare name: string;

    @ApiProperty({ example: 'john_doe@example.com', description: 'Email' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: true,
        validate: { isEmail: true }
    })
    declare email: string;

    @ApiProperty({ example: '7416815171', description: 'Mobile' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: { len: [10, 10], is: /^[6-9]{1}[0-9]{9}$/ }
    })
    declare mobile: string;

    @ApiProperty({ example: 'read', description: 'User Roles' })
    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        defaultValue: UserRole.USER_READ,
        allowNull: false,
        validate: {
            isIn: [Object.values(UserRole)] // Sequelize validation
        }
    })
    declare role: UserRole; // Add 'declare' modifier

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    declare isVerified: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    declare isActivate: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    declare isBlocked: boolean;
}
