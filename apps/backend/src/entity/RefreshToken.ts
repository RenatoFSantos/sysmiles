import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity({ name: 'RefreshToken' })
export class RefreshToken extends BaseEntity {
    @Column({ name: 'expiresIn', type: 'int' })
    expiresIn: number;

    @Column({ name: 'userId', type: 'varchar', length: 50 })
    userId: string;

    @ManyToOne(() => User, { eager: true })
    user: User;
}
