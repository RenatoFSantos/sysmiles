import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ClinicDentist } from './ClinicDentist';
import { Patient } from './Patient';

@Entity({ name: 'ClinicDentistPatient' })
export class ClinicDentistPatient extends BaseEntity {
    @OneToOne(() => ClinicDentist)
    @JoinColumn()
    clinicDentist: ClinicDentist;

    @OneToOne(() => Patient)
    @JoinColumn()
    patient: Patient;
}
