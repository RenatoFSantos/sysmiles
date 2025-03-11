import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Address } from './Address';
import { User } from './User';

@Entity({ name: 'Sponsor' })
export class Sponsor extends BaseEntity {
    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
