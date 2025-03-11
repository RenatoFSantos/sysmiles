import { JWT } from 'next-auth/jwt';

export type UserLoginType = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    provider?: string;
    token?: JWT;
};
