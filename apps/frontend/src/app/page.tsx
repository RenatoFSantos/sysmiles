import Layout from '@/components/templates/Layout';
import React from 'react';
import { getServerAuthSession } from '@/backend/authentication/auth';
import { redirect } from 'next/navigation';
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next';

export default async function Home() {
    console.log('HOMEEEEEE!!!!');
    const session = await getServerAuthSession();
    console.log('Valor do session=', session);
    let cookieUser = getCookie('drteeth-user');

    let userLogged: any;

    if (!session?.user) {
        console.log('Não tem sessão', cookieUser);
        if (!cookieUser) {
            redirect('/authentication');
        } else {
            userLogged = await cookieUser;
        }
    } else {
        console.log('ENTREI NO ELSE');
        userLogged = await JSON.stringify(session?.user);
    }

    return (
        <Layout titulo={'DrTeeth'} subtitulo={'Subtitulo'}>
            <p>Bem vindo! {userLogged?.name}</p>
        </Layout>
    );
}
