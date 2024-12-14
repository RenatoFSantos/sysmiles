import { FindOneOptions } from 'typeorm';
import { User } from '../entity/User';
import { BaseController } from './BaseController';
import { Request } from 'express';
import * as md5 from 'md5';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import * as multer from 'multer';

export class UserController extends BaseController<User> {
    constructor() {
        super(User, false);
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
