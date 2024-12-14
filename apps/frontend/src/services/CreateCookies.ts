'use server';

import { JWT } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export default async function CreateCookies(session: JWT) {
    if (session) {
        await cookies().set(
            'drteeth-user',
            JSON.stringify({
                user: {
                    ...session,
                },
            })
        );
    }
}
