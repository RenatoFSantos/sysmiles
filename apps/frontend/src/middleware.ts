export { default } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

// export const config = { matcher: ['/'] };

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();

    // console.log('Cookie Middleware');
    // const userCookie = await response.cookies.get('drteeth-user')?.value;
    // if (userCookie) {
    //     const token = await getToken(userCookie);
    //     console.log('Cookie Middleware 2');
    //     response.cookies.set('x-token-access', `Bearer ${token}`);
    // }
    // return response;

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
