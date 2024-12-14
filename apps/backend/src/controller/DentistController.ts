import { Dentist } from '../entity/Dentist';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class DentistController extends BaseController<Dentist> {
    constructor() {
        super(Dentist);
    }

    async save(request: Request) {
        let _dentist = <Dentist>request.body();
        super.isRequired(_dentist.dentNrCRO, 'Número do CRO é necessário!');
        return super.save(_dentist, request);
    }
}
