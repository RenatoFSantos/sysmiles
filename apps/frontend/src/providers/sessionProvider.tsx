// Uso obrigatório do use client nesta função (https://www.youtube.com/watch?v=gahR_3kxZhI&t=2273s - aos 20:56)
'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface NextAuthSessionProviderProps {
    children: ReactNode;
}

export default function NextAuthSessionProvider({ children }: NextAuthSessionProviderProps) {
    return <SessionProvider>{children}</SessionProvider>;
}
