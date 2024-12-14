import { ClinicDentistPatient } from './../entity/ClinicDentistPatient';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class ClinicDentistPatientController extends BaseController<ClinicDentistPatient> {
    constructor() {
        super(ClinicDentistPatient);
    }

    async save(request: Request) {
        let _clinicDentistPatient = <ClinicDentistPatient>request.body();
        return super.save(_clinicDentistPatient, request);
    }
}
