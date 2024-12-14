import { Sponsor } from '../entity/Sponsor';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class SponsorController extends BaseController<Sponsor> {
    constructor() {
        super(Sponsor);
    }

    async save(request: Request) {
        let _sponsor = <Sponsor>request.body();
        return super.save(_sponsor, request);
    }
}
