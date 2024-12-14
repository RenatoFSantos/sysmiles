import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Address } from './Address';
import { User } from './User';

@Entity({ name: 'Dentist' })
export class Dentist extends BaseEntity {
    @Column({
        name: 'dent_nr_cro',
        type: 'varchar',
        length: 14,
        comment: 'CRO Number',
    })
    dentNrCRO: string;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
