import { iResultHttp } from '@/interface/iResultHttp';
import Cookies from 'js-cookie';
import axios from 'axios';
// import { cookies } from 'next/headers';

export default class HttpService {
    private createHeader() {
        let header: {};
        // const cookiesStore = await cookies();
        // const token = cookiesStore.get('drteeth-token').value;
        const token = Cookies.get('drteeth-token')?.toString();
        if (token) {
            header = {
                'Content-Type': 'application/json',
                'x-token-access': `Bearer ${token}`,
            };
        }
        return header;
    }

    public get(url: string, url_search?: URLSearchParams): Promise<iResultHttp> {
        const header = this.createHeader();
        let params = new URLSearchParams();
        if (url_search.has) {
            for (const [key, value] of url_search.entries()) {
                params.append(key, value);
            }
        }
        return new Promise(async (resolve) => {
            console.log('Valores do Params=', params);
            console.log('Valores da url=', url);
            try {
                const res = await axios(url, {
                    method: 'GET',
                    headers: header,
                    params,
                });
                resolve({ success: true, data: res.data, error: null });
            } catch (error) {
                resolve({ success: false, data: null, error });
            }
        });
    }

    public post(url: string, model: any): Promise<iResultHttp> {
        const myBody = model;
        const header = this.createHeader();
        return new Promise(async (resolve) => {
            try {
                const res = await axios(url, {
                    method: 'POST',
                    headers: header,
                    data: myBody,
                });
                resolve({ success: true, data: res.data, error: null });
            } catch (error) {
                resolve({ success: false, data: null, error });
            }
        });
    }

    public delete(url: string): Promise<iResultHttp> {
        const header = this.createHeader();
        return new Promise(async (resolve) => {
            try {
                const res = await axios(url, {
                    method: 'DELETE',
                    headers: header,
                });
                resolve({ success: true, data: res.data, error: null });
            } catch (error) {
                resolve({ success: false, data: null, error });
            }
        });
    }
}
