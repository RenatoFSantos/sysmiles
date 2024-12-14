import { AddressController } from './controller/AddressController';
import { AnamnesisController } from './controller/AnamnesisController';
import { ClinicController } from './controller/ClinicController';
import { ClinicDentistController } from './controller/ClinicDentistController';
import { ClinicDentistPatientController } from './controller/ClinicDentistPatientController';
import { ClinicalExaminationController } from './controller/ClinicalExamination';
import { DentistController } from './controller/DentistController';
import { PatientController } from './controller/PatientController';
import { SponsorController } from './controller/SponsorController';
import { UserController } from './controller/UserController';

export const Routes = [
    { method: 'get', route: '/users/email/:email', controller: UserController, action: 'email' },
    { method: 'get', route: '/users/:id', controller: UserController, action: 'one' },
    { method: 'get', route: '/users', controller: UserController, action: 'all' },
    { method: 'post', route: '/users/auth', controller: UserController, action: 'auth' },
    { method: 'post', route: '/users/social', controller: UserController, action: 'authSocial' },
    { method: 'post', route: '/users/create', controller: UserController, action: 'createUser' },
    { method: 'post', route: '/users', controller: UserController, action: 'save' },
    { method: 'delete', route: '/users/:id', controller: UserController, action: 'remove' },

    { method: 'get', route: '/address/:id', controller: AddressController, action: 'one' },
    { method: 'get', route: '/address', controller: AddressController, action: 'all' },
    { method: 'post', route: '/address', controller: AddressController, action: 'save' },
    { method: 'delete', route: '/address/:id', controller: AddressController, action: 'remove' },

    { method: 'get', route: '/anamnesis/:id', controller: AnamnesisController, action: 'one' },
    { method: 'get', route: '/anamnesis', controller: AnamnesisController, action: 'all' },
    { method: 'post', route: '/anamnesis', controller: AnamnesisController, action: 'save' },
    { method: 'delete', route: '/anamnesis/:id', controller: AnamnesisController, action: 'remove' },

    { method: 'get', route: '/clinic/:id', controller: ClinicController, action: 'one' },
    { method: 'get', route: '/clinic', controller: ClinicController, action: 'all' },
    { method: 'post', route: '/clinic', controller: ClinicController, action: 'save' },
    { method: 'delete', route: '/clinic/:id', controller: ClinicController, action: 'remove' },

    { method: 'get', route: '/clinicexamination/:id', controller: ClinicalExaminationController, action: 'one' },
    { method: 'get', route: '/clinicexamination', controller: ClinicalExaminationController, action: 'all' },
    { method: 'post', route: '/clinicexamination', controller: ClinicalExaminationController, action: 'save' },
    { method: 'delete', route: '/clinicexamination/:id', controller: ClinicalExaminationController, action: 'remove' },

    { method: 'get', route: '/clinicdentist/:id', controller: ClinicDentistController, action: 'one' },
    { method: 'get', route: '/clinicdentist', controller: ClinicDentistController, action: 'all' },
    { method: 'post', route: '/clinicdentist', controller: ClinicDentistController, action: 'save' },
    { method: 'delete', route: '/clinicdentist/:id', controller: ClinicDentistController, action: 'remove' },

    { method: 'get', route: '/clinicdentistpatient/:id', controller: ClinicDentistPatientController, action: 'one' },
    { method: 'get', route: '/clinicdentistpatient', controller: ClinicDentistPatientController, action: 'all' },
    { method: 'post', route: '/clinicdentistpatient', controller: ClinicDentistPatientController, action: 'save' },
    {
        method: 'delete',
        route: '/clinicdentistpatient/:id',
        controller: ClinicDentistPatientController,
        action: 'remove',
    },

    { method: 'get', route: '/dentist/:id', controller: DentistController, action: 'one' },
    { method: 'get', route: '/dentist', controller: DentistController, action: 'all' },
    { method: 'post', route: '/dentist', controller: DentistController, action: 'save' },
    { method: 'delete', route: '/dentist/:id', controller: DentistController, action: 'remove' },

    { method: 'get', route: '/patient/:id', controller: PatientController, action: 'one' },
    { method: 'get', route: '/patient', controller: PatientController, action: 'all' },
    { method: 'post', route: '/patient', controller: PatientController, action: 'save' },
    { method: 'delete', route: '/patient/:id', controller: PatientController, action: 'remove' },

    { method: 'get', route: '/sponsor/:id', controller: SponsorController, action: 'one' },
    { method: 'get', route: '/sponsor', controller: SponsorController, action: 'all' },
    { method: 'post', route: '/sponsor', controller: SponsorController, action: 'save' },
    { method: 'delete', route: '/sponsor/:id', controller: SponsorController, action: 'remove' },
];
