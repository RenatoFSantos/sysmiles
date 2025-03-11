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
}
