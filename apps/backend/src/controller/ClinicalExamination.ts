import { ClinicalExamination } from '../entity/ClinicalExamination';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class ClinicalExaminationController extends BaseController<ClinicalExamination> {
    constructor() {
        super(ClinicalExamination);
    }

    async save(request: Request) {
        let _clinicalExamination = <ClinicalExamination>request.body();
        return super.save(_clinicalExamination, request);
    }
}
