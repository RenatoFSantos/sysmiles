import { Anamnesis } from '../entity/Anamnesis';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class AnamnesisController extends BaseController<Anamnesis> {
    constructor() {
        super(Anamnesis);
    }

    async save(request: Request) {
        let _anamnesis = <Anamnesis>request.body();
        return super.save(_anamnesis, request);
    }
}
