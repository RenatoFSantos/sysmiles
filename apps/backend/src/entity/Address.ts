import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'Address' })
export class Address extends BaseEntity {
    @Column({
        name: 'addr_nm_address',
        type: 'varchar',
        length: 50,
        comment: 'Address identification',
    })
    addrNmAddress: string;

    @Column({
        name: 'addr_ds_address',
        type: 'varchar',
        length: 100,
        comment: 'Address',
    })
    addrDsAddress: string;

    @Column({
        name: 'addr_ds_complement',
        type: 'varchar',
        length: 100,
        comment: 'Address complement',
        nullable: true,
    })
    addrDsComplement: string;

    @Column({
        name: 'addr_ds_number',
        type: 'varchar',
        length: 10,
        comment: 'Number',
        nullable: true,
    })
    addrDsNumber: string;

    @Column({
        name: 'addr_nm_district',
        type: 'varchar',
        length: 20,
        comment: 'District',
        nullable: true,
    })
    addrNmDistrict: string;

    @Column({
        name: 'addr_nm_city',
        type: 'varchar',
        length: 0,
        comment: 'City',
    })
    addrNmCity: string;

    @Column({
        name: 'addr_sg_state',
        type: 'varchar',
        length: 2,
        comment: 'State',
    })
    addrSgState: string;

    @Column({
        name: 'addr_nr_zipcode',
        type: 'varchar',
        length: 8,
        comment: 'Zipcode',
    })
    addrNrZipcode: string;

    @Column({
        name: 'addr_nm_contact',
        type: 'varchar',
        length: 20,
        comment: 'Contact name',
        nullable: true,
    })
    addrNmContact: string;

    @Column({
        name: 'addr_ds_phone',
        type: 'varchar',
        length: 20,
        comment: 'Contact phone',
        nullable: true,
    })
    addrDsPhone: string;
}
