import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Sponsor } from './Sponsor';
import { Address } from './Address';
import { User } from './User';
import { ClinicalExamination } from './ClinicalExamination';
import { Anamnesis } from './Anamnesis';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'Patient' })
export class Patient extends BaseEntity {
    @Column({
        name: 'pati_vl_pending',
        type: 'decimal',
        precision: 10,
        scale: 2,
        comment: 'Pending amount',
        default: 0,
    })
    patiVlPending: number;

    @ManyToOne(() => Sponsor, { eager: true })
    sponsor: Sponsor;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToOne(() => Anamnesis)
    @JoinColumn()
    anamnesis: Anamnesis;

    @OneToOne(() => ClinicalExamination)
    @JoinColumn()
    clinicalExamination: ClinicalExamination;
}
