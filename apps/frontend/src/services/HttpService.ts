import { iResultHttp } from '@/interface/iResultHttp';

export default class HttpService {
    private createHeader() {
        // const cookiesStore = cookies();
        let header: {};
        // if (cookiesStore.has('drteeth-user')) {
        //     const cookieUser = cookiesStore.get('drteeth-user').toString();
        //     const token = this.getToken(cookieUser);
        header = {
            'Content-Type': 'application/json',
            // 'x-token-access': `Bearer ${token}`,
        };
        // }
        return header;
    }

    // private getToken(cookieUser: string) {
    //     let cookies = cookieUser.split(';');

    //     cookies.forEach((element) => {
    //         const [cookieName, cookieValue] = element.split('=');
    //         if (cookieName === 'token') {
    //             return cookieValue;
    //         }
    //     });
    //     return null;
    // }

    public get(url: string): Promise<iResultHttp> {
        const header = this.createHeader();
        return new Promise(async (resolve) => {
            try {
                const res = await fetch(url, {
                    method: 'GET',
                    headers: header,
                });
                resolve({ success: true, data: res.json(), error: null });
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
                const res = await fetch(url, {
                    method: 'POST',
                    headers: header,
                    body: myBody,
                });
                resolve({ success: true, data: res.json(), error: null });
            } catch (error) {
                resolve({ success: false, data: null, error });
            }
        });
    }

    public delete(url: string): Promise<iResultHttp> {
        const header = this.createHeader();
        return new Promise(async (resolve) => {
            try {
                const res = await fetch(url, {
                    method: 'DELETE',
                    headers: header,
                });
                resolve({ success: true, data: res.json(), error: null });
            } catch (error) {
                resolve({ success: false, data: null, error });
            }
        });
    }
}
