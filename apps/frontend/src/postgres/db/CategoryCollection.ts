import { iResultHttp } from '@/interface/iResultHttp';
import Category from '@/model/Category';
import BaseService from '@/services/BaseService';
import HttpService from '@/services/HttpService';
import { toast } from 'sonner';

export default class CategoryCollection extends BaseService<Category> {
    constructor() {
        super('category');
        const http = new HttpService();
    }

    public save(category: Category): Promise<Category> {
        return new Promise(async (resolve) => {
            try {
                const result = await this.http.post(this.urlBase, category);
                if (result.success) {
                    resolve(result.data);
                    toast.success('Categoria salva!');
                }
            } catch (error) {
                throw new Error('Falha na gravação do registro. Verifique!');
            }
        });
    }
}
