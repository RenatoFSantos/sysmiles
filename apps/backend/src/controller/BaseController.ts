import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
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

    private checkNoPermission(request: Request) {
        const validation = this._onlyRootController && request.params.userCdType !== 'A';
        // console.log('CheckNoPermission=', validation);
        return validation;
    }

    async all(request: Request, response: Response, next: NextFunction) {
        if (this.checkNoPermission(request)) return this._errorRoot;
        const findAllRegister: FindOptionsWhere<T> = {
            where: {
                deleted: false,
            },
        } as unknown as FindOptionsWhere<T>;
        return await this._repository.find(findAllRegister);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        console.log('pesquisando o usuário', request.param.id);
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
