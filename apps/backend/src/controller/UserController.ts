import { FindManyOptions, FindOneOptions } from 'typeorm';
import { User } from '../entity/User';
import { BaseController } from './BaseController';
import { Request, Response, NextFunction } from 'express';
import * as md5 from 'md5';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';

export class UserController extends BaseController<User> {
    constructor() {
        super(User, false);
    }

    async allUsers(request: Request, response: Response, next: NextFunction) {
        const params = request.query;
        const keys = Object.keys(params);
        const values = Object.values(params);
        // Sort
        const sort = params.sort || 'user_nm_name';
        // Path
        const path = params.path;
        // Number of records per page
        const limit: number = params.limit || 10;
        // Page number
        const page = params.page || 1;
        // Previous records number
        const numRec = page === 1 ? 1 : page * limit - limit;
        // Number of records
        const totalRec = await this.allActives();
        // const totalRec = await this._repository.count();
        // Last page
        const lastPage = Math.ceil(+totalRec / limit);

        let result: User[];
        let search = '';
        if (params?.user_nm_name) {
            search = `%${params?.user_nm_name}%`;
            result = await this.repository
                .createQueryBuilder('table')
                .where('table.deleted = false')
                .andWhere(`table.user_nm_name ILIKE :search`, { search })
                .orderBy(`table.${sort}`)
                .getMany();
        } else {
            result = await this.repository
                .createQueryBuilder('table')
                .where('table.deleted = false')
                .orderBy(`table.${sort}`)
                .take(limit)
                .skip(numRec)
                .getMany();
        }
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
                total: keys.length > 3 ? result.length : totalRec,
            },
        });
    }

    async email(request: Request) {
        let userDsEmail = request.params.email;
        if (!userDsEmail) {
            return { status: 400, message: 'Informe o email para verificação!' };
        }
        const findOneRegister: FindOneOptions<User> = {
            where: {
                userDsEmail: userDsEmail,
            },
        } as unknown as FindOneOptions<User>;
        let _user = await this.repository.findOne(findOneRegister);
        if (_user) {
            let _userLogin = {
                userDsEmail: _user.userDsEmail,
                userCdPassword: _user.userCdPassword,
            };
            return {
                status: 200,
                message: {
                    user: _userLogin,
                },
            };
        } else {
            return { status: 404, message: 'Email inexistente!' };
        }
    }

    async filterName(request: Request) {
        let filter = request.params.search;
        if (!filter) {
        } else {
        }
    }

    async auth(request: Request) {
        let numChar: string = '';
        numChar = await request.body.userCdPassword;
        let { userDsEmail, userCdPassword } = request.body;
        if (!userDsEmail || !userCdPassword) {
            return { status: 400, message: 'Informe o email e a senha para efetuar o login!' };
        }
        const findOneRegister: FindOneOptions<User> = {
            where: {
                userDsEmail: userDsEmail,
                userCdPassword: numChar.length > 20 ? userCdPassword : md5(userCdPassword),
            },
        } as unknown as FindOneOptions<User>;
        let _user = await this.repository.findOne(findOneRegister);
        if (_user) {
            let _payload = {
                uid: _user.uid,
                userSgUser: _user.userSgUser,
                userNmName: _user.userNmName,
                userTxAvatar: _user.userTxAvatar,
                userDsEmail: _user.userDsEmail,
                userCdType: _user.userCdType,
            };
            return {
                status: 200,
                message: {
                    user: _payload,
                    token: sign(
                        {
                            ..._payload,
                            tm: new Date().getTime(),
                        },
                        process.env.SECRETKEY
                    ),
                },
            };
        } else {
            return { status: 404, message: 'Email ou senha inválidos!' };
        }
    }

    async authSocial(request: Request) {
        let { uid, userSgUser, userNmName, userTxAvatar, userDsEmail, userCdType } = request.body;
        let _payload = {
            uid,
            userSgUser,
            userNmName,
            userTxAvatar,
            userDsEmail,
            userCdType,
        };
        return {
            status: 200,
            message: {
                user: _payload,
                token: sign(
                    {
                        ..._payload,
                        tm: new Date().getTime(),
                    },
                    process.env.SECRETKEY
                ),
            },
        };
    }

    async createUser(request: Request) {
        let { userSgUser, userNmName, userDsEmail, userCdPassword, userCdRecovery, userCdType = 'V' } = request.body;
        super.isRequired(userSgUser, 'A sigla do usuário é obrigatório!');
        super.isRequired(userNmName, 'O nome do usuário é obrigatório!');
        super.isRequired(userDsEmail, 'O email do usuário é obrigatório!');
        super.isEmail(userDsEmail, 'Email do usuário inválido!');
        super.isRequired(userCdPassword, 'A senha do usuário é obrigatória!');
        super.isRequired(userCdRecovery, 'A senha de recuperação é obrigatória!');

        let _user = new User();
        _user.userSgUser = userSgUser;
        _user.userNmName = userNmName;
        _user.userDsEmail = userDsEmail;
        if (userCdPassword) {
            _user.userCdPassword = md5(userCdPassword);
        }
        _user.userCdType = userCdType;
        _user.userCdRecovery = userCdRecovery;

        return super.save(_user, request);
    }

    async save(request: Request) {
        let _user = <User>request.body;
        super.isRequired(_user.userSgUser, 'A sigla do usuário é obrigatório!');
        super.isRequired(_user.userNmName, 'O nome do usuário é obrigatório!');
        super.isRequired(_user.userDsEmail, 'O email do usuário é obrigatório!');
        super.isEmail(_user.userDsEmail, 'Email do usuário inválido!');
        super.isRequired(_user.userCdPassword, 'A senha do usuário é obrigatória!');
        super.isRequired(_user.userCdRecovery, 'A senha de recuperação é obrigatória!');
        super.isRequired(_user.userCdType, 'O perfil do usuário é obrigatório!');
        if (_user.userCdPassword) {
            _user.userCdPassword = md5(_user.userCdPassword);
        }
        return super.save(_user, request);
    }
}
