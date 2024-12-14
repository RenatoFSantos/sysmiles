import { Patient } from '../entity/Patient';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class PatientController extends BaseController<Patient> {
    constructor() {
        super(Patient);
    }

    async save(request: Request) {
        let _patient = <Patient>request.body();
        return super.save(_patient, request);
    }
}
