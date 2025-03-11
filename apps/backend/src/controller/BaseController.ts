import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { BaseNotification } from '../entity/BaseNotification';

export abstract class BaseController<T> extends BaseNotification {
    private _repository: Repository<T>;
    private _onlyRootController: boolean = false;
    private _errorRoot: any = {
        status: 401,
        errors: ['Você não está autorizado a executar essa funcionalidade!'],
    };

    constructor(entity: any, onlyRoot: boolean = false) {
        super();
        this._repository = AppDataSource.getRepository<T>(entity);
        this._onlyRootController = onlyRoot;
    }

    async allActives(): Promise<number> {
        const findOptions: FindManyOptions = {
            where: {
                deleted: false,
            },
        };
        const all = await this._repository.find(findOptions);
        console.log('Valor do all=', all.length);
        return all.length;
    }

    async allPagination(request: Request, response: Response, next: NextFunction) {
        const params = request.query;
        const keys = Object.keys(params);
        const values = Object.values(params);
        // Sort
        const sort = params.sort;
        console.log('Valor do sort=', sort);
        // Path
        const path = params.path;
        // Number of records per page
        const limit: number = params.limit || 10;
        // Page number
        const page = params.page || 1;
        console.log('Valor do page=', page);
        // Previous records number
        const numRec = page === 1 ? 1 : page * limit - limit;
        console.log('Valor do numRec=', numRec);
        // Number of records
        const totalRec = await this.allActives();
        console.log('Valor do allActives=', totalRec);
        // Fields Search Name
        const fieldSearch = params.field_search;
        console.log('Valor do fieldSearch=', fieldSearch);
        // const totalRec = await this._repository.count();
        // Last page
        const lastPage = Math.ceil(+totalRec / limit);
        console.log('Valor do lastPage=', lastPage);
        let result: T[];
        let search = '';
        console.log('Valor do params=', params);
        if (params?.search !== 'null') {
            console.log('Entrei no search', params?.search);
            search = `%${params?.search}%`;
            result = await this.repository
                .createQueryBuilder('table')
                .where('table.deleted = false')
                .andWhere(`table.${fieldSearch} ILIKE :search`, { search })
                .orderBy(`table.${sort}`)
                .getMany();
        } else {
            console.log('Entrei no geral');
            result = await this.repository
                .createQueryBuilder('table')
                .where('table.deleted = false')
                .orderBy(`table.${sort}`)
                .take(limit)
                .skip(numRec)
                .getMany();
        }
        // console.log('Valor do RESULT=', result);
        return response.json({
            result,
            pagination: {
                // Path
                path: path,
                // Current Page
                page: +page,
                // Total per page
                recpage: +limit,
                // Previous page
                prev_page_url: +page - 1 >= 1 ? page - 1 : false,
                // Next page
                next_page_url: +page + 1 > lastPage ? false : +page + 1,
                // Last Page
                lastPage,
                // Number of records
                total: search !== '' ? result.length : totalRec,
            },
        });
    }

    private checkNoPermission(request: Request) {
        const validation = this._onlyRootController && request.params.userCdType !== 'A';
        return validation;
    }

    async all(request: Request, response: Response, next: NextFunction) {
        if (this.checkNoPermission(request)) return this._errorRoot;
        const findOptions: FindManyOptions = {
            where: {
                deleted: false,
            },
        };
        return await this._repository.find(findOptions);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        // if (this.checkNoPermission(request)) return this._errorRoot;
        const uid = request.params.id as string;
        const findOneRegister: FindOneOptions<T> = {
            where: {
                uid: uid,
                deleted: false,
            },
        } as unknown as FindOneOptions<T>;
        return await this._repository.findOne(findOneRegister);
    }

    async save(model: any, request: Request) {
        let _modelSave = model;
        if (model.uid) {
            const uid = model.uid as string;
            const findOneRegister: FindOptionsWhere<T> = {
                where: {
                    uid: uid,
                    deleted: false,
                },
            } as unknown as FindOptionsWhere<T>;

            // remove automatic control fields
            delete model['createAt'];
            delete model['updateAt'];
            delete model['deleted'];

            let _modelSave = await this._repository.findOne(findOneRegister);
        }

        if (_modelSave) {
            Object.assign(_modelSave, model);
            return this._repository.save(_modelSave);
        } else {
            return {
                status: 400,
                errors: this.allNotifications,
            };
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        if (this.checkNoPermission(request)) return this._errorRoot;
        const uid = request.params.id as string;
        const findOneRegister: FindOneOptions<T> = {
            where: {
                uid: uid,
                deleted: false,
            },
        } as unknown as FindOneOptions<T>;

        let model: any = await this._repository.findOne(findOneRegister);

        if (model) {
            model.deleted = true;
            return this._repository.save(model);
        } else {
            return {
                status: 404,
                errors: 'Nenhum registro encontrado!',
            };
        }
    }

    get repository() {
        return this._repository;
    }
}
