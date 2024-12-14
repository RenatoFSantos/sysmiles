import { ClinicDentist } from './../entity/ClinicDentist';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class ClinicDentistController extends BaseController<ClinicDentist> {
    constructor() {
        super(ClinicDentist);
    }

    async save(request: Request) {
        let _clinicDentist = <ClinicDentist>request.body();
        return super.save(_clinicDentist, request);
    }
}
