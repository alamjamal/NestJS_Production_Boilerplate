// This file defines the User entity for a Sequelize-based application.
// It uses the sequelize-typescript library to define the model and its properties.
import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model } from 'sequelize-typescript';
// import { Table, Column, Model, PrimaryKey, AutoIncrement, Sequelize } from 'sequelize-typescript';

import { DataTypes } from 'sequelize';

@Table({
    timestamps: true, // Enable automatic timestamps
    tableName: 'Users',
    underscored: true // Use snake_case for column names
})
export class User extends Model {
    //using ApiProperty to expose response to swagger
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'UUIDv7 Primary Key' })
    @Column({
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
        // validate: {
        //   isUUID: 4 // Sequelize validation
        // }
    })
    declare id: string; // Add 'declare' modifier

    @ApiProperty({ example: 'john_doe', description: 'Name' })
    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare name: string;

    @ApiProperty({ example: 'john_doe@example.com', description: 'Email' })
    @Column({
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true } // Validate email format
    })
    declare email: string;
}
