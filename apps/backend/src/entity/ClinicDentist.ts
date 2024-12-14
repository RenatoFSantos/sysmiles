import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Clinic } from './Clinic';
import { Dentist } from './Dentist';

@Entity({ name: 'ClinicDentist' })
export class ClinicDentist extends BaseEntity {
    @OneToOne(() => Clinic)
    @JoinColumn()
    clinic: Clinic;

    @OneToOne(() => Dentist)
    @JoinColumn()
    dentist: Dentist;
}
