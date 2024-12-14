import { iResultHttp } from '@/interface/iResultHttp';
import User from '@/model/User';
import BaseService from '@/services/BaseService';
import HttpService from '@/services/HttpService';
import { toast } from 'sonner';

export default class UserCollection extends BaseService<User> {
    constructor() {
        super('users');
        const http = new HttpService();
    }

    public save(user: User): Promise<User> {
        console.log('User que chegou=', user);
        return new Promise(async (resolve) => {
            try {
                const result = await this.http.post(this.urlBase, user);
                if (result.success) {
                    resolve(result.data);
                    toast.success('Usuário salvo!');
                }
            } catch (error) {
                throw new Error('Falha na gravação do registro. Verifique!');
            }
        });
    }

    public upload(avatar: any): Promise<string> {
        console.log('Chegamos no upload do arquivo=', avatar);
        return new Promise(async (resolve) => {
            try {
                const result = await this.http.post(this.urlBase, avatar);
                if (result.success) {
                    resolve(result.data);
                }
            } catch (error) {
                throw new Error('Falha no uplod da imagem do avatar. Verifique!');
            }
        });
    }

    // async all(): Promise<iResultHttp> {
    //     let listUsers: Array<User> = [];
    //     const url = process.env.NEXT_PUBLIC_URL + 'users';
    //     try {
    //         const res = await this.getAll();
    //         if(res.success) {
    //             return res.data;
    //         }
    //         result = await fetch(url, {
    //             method: 'get',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (users) {
    //             listUsers = await users.json();
    //         }
    //     } catch (error) {
    //         throw new Error('Erro: ', error);
    //     }
    //     console.log('Retorno =', listUsers);
    //     return listUsers;
    // }

    // async all(): Promise<Array<User>> {
    //     let listUsers: Array<User> = [];
    //     const url = process.env.NEXT_PUBLIC_URL + 'users';
    //     try {
    //         const users = await fetch(url, {
    //             method: 'get',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (users) {
    //             listUsers = await users.json();
    //         }
    //     } catch (error) {
    //         throw new Error('Erro: ', error);
    //     }
    //     console.log('Retorno =', listUsers);
    //     return listUsers;
    // }
}
