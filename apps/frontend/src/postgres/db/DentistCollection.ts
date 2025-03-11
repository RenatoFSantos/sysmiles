import Dentist from '@/model/Dentist';
import BaseService from '@/services/BaseService';
import HttpService from '@/services/HttpService';
import { toast } from 'sonner';

export default class DentistCollection extends BaseService<Dentist> {
    constructor() {
        super('dentist');
        const http = new HttpService();
    }

    public save(dentist: Dentist): Promise<Dentist> {
        return new Promise(async (resolve) => {
            try {
                const result = await this.http.post(this.urlBase, dentist);
                if (result.success) {
                    resolve(result.data);
                    toast.success('Dentista salvo!');
                }
            } catch (error) {
                throw new Error('Falha na gravação do registro. Verifique!');
            }
        });
    }
}
