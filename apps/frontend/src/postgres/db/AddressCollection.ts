import Address from '@/model/Address';
import BaseService from '@/services/BaseService';
import HttpService from '@/services/HttpService';
import { toast } from 'sonner';

export default class AddressCollection extends BaseService<Address> {
    constructor() {
        super('address');
        const http = new HttpService();
    }

    public save(address: Address): Promise<Address> {
        return new Promise(async (resolve) => {
            try {
                const result = await this.http.post(this.urlBase, address);
                if (result.success) {
                    resolve(result.data);
                    toast.success('Endereço salvo!');
                }
            } catch (error) {
                throw new Error('Falha na gravação do registro. Verifique!');
            }
        });
    }
}
