export { default } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export const config = { matcher: ['/'] };

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    const userCookie = await req.cookies.get('drteeth-user')?.value;
    if (userCookie) {
        const objUser = await JSON.parse(userCookie);
        const token = await objUser?.user?.token;
        response.cookies.set('drteeth-token', token);
    }

    return response;
}
