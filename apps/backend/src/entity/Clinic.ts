import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Address } from './Address';

@Entity({ name: 'Clinic' })
export class Clinic extends BaseEntity {
    @Column({
        name: 'clin_nm_clinic',
        type: 'varchar',
        length: 100,
        comment: 'Clinic Name',
    })
    clinNmClinic: string;

    @Column({
        name: 'clin_in_document',
        type: 'char',
        length: 1,
        comment: 'F-Natural Person (Pessoa Física), J-Legal Person (Pessoa Jurídica)',
        default: 'F',
    })
    clinInDocument: string;

    @Column({
        name: 'clin_nr_document',
        type: 'varchar',
        length: 14,
        comment: 'Document number',
        nullable: true,
    })
    clinNrDocument: string;

    @Column({
        name: 'clin_ds_phone',
        type: 'varchar',
        length: 20,
        comment: 'Phone number',
        nullable: true,
    })
    clinDsPhone: string;

    @Column({
        name: 'clin_ds_smartphone',
        type: 'varchar',
        length: 20,
        comment: 'Smartphone number',
        nullable: true,
    })
    clinDsSmatphone: string;

    @Column({
        name: 'clin_ds_email',
        type: 'varchar',
        length: 100,
        comment: 'Email',
        nullable: true,
    })
    clinDsEmail: string;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;
}
