import { Category } from '../entity/Category';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class CategoryController extends BaseController<Category> {
    constructor() {
        super(Category);
    }

    async save(request: Request) {
        let _category = <Category>request.body();
        return super.save(_category, request);
    }
}
