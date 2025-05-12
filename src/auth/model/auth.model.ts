import { matches, validate } from 'class-validator';
import { Table, Model, Column, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'otp', timestamps: false })
export class OTP extends Model<OTP> {
    // Make `mobile` the primary key and foreign key:
    @PrimaryKey
    @ForeignKey(() => User)
    @Column({ type: DataType.STRING(10), allowNull: false })
    mobile: string;

    // Set up the relationship
    @BelongsTo(() => User, 'mobile')
    user: User;

    @Column({
        type: DataType.STRING(6),
        allowNull: false,
        validate: {
            len: {
                args: [4, 4],
                msg: 'OTP code must be exactly 4 digits'
            },
            is: /^[0-9]{4}$/
        }
    })
    code: string;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    expiresAt: Date;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isUsed: boolean;
}
