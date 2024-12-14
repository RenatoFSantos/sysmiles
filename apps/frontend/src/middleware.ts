export { default } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

// export const config = { matcher: ['/'] };

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    // console.log('Valor no Request= ', req);
    // console.log('Valor no Response= ', response);
    // const session = await getServerSession();
    // console.log('Valor Session no Middleware= ', session);
    // await response.cookies.set('drteeth-user', JSON.stringify(session!.user));
    // const nameCookie = await req.cookies.get('drteeth-user');
    // console.log('Cookie retornado=', nameCookie); // { name: 'name', value: 'junior' }

    const userCookie = await response.cookies.get('drteeth-user')?.value;
    if (userCookie) {
        const token = await getToken(userCookie);
        response.cookies.set('x-token-access', `Bearer ${token}`);
    }
    return response;

    function getToken(cookieUser: string) {
        let cookies = cookieUser?.split(',');
        if (cookies) {
            for (let element of cookies) {
                element = element.replace(/"/g, '');
                const [cookieName, cookieValue] = element.split(':');
                if (cookieName === 'token') {
                    return cookieValue.trim();
                }
            }
        }
    }
}
