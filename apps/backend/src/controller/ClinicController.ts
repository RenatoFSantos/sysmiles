import { Clinic } from '../entity/Clinic';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class ClinicController extends BaseController<Clinic> {
    constructor() {
        super(Clinic);
    }

    async save(request: Request) {
        let _clinic = <Clinic>request.body();
        return super.save(_clinic, request);
    }
}
