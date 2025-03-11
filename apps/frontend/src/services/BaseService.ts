import { iResultHttp } from '@/interface/iResultHttp';
import HttpService from './HttpService';

export default abstract class BaseService<T> {
    urlBase: string = '';
    http: HttpService = new HttpService();

    constructor(public url: string) {
        this.urlBase = process.env.NEXT_PUBLIC_URL + url;
    }

    private createHeader() {
        // const cookiesStore = cookies();
        let header: {};
        // if (cookiesStore.has('drteeth-user')) {
        //     const cookieUser = cookiesStore.get('drteeth-user').toString();
        //     const token = this.getToken(cookieUser);
        //     header = {
        //         'Content-Type': 'application/json',
        //         'x-token-access': `Bearer ${token}`,
        //     };
        // }
        return header;
    }

    public getAll(search?: URLSearchParams): Promise<iResultHttp> {
        return this.http.get(this.urlBase, search);
    }

    public getById(id: string): Promise<iResultHttp> {
        return this.http.get(`${this.urlBase}/${id}`);
    }

    public post(model: T): Promise<iResultHttp> {
        return this.http.post(this.urlBase, model);
    }

    public delete(id: string): Promise<iResultHttp> {
        return this.http.delete(`${this.urlBase}/${id}`);
    }
}
