import React from 'react';
import { getServerAuthSession } from '@/backend/authentication/auth';
import { redirect } from 'next/navigation';
import { UserLoginType } from '@/types/userLoginType';
import Layout from '@/components/templates/Layout';

export default async function CrudLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerAuthSession();

    let userLogged: UserLoginType;
    let titulo: string;
    let subtitulo: string;

    if (!session?.user) {
        redirect('/authentication');
    } else {
        userLogged = await session.user;

        switch (userLogged.provider) {
            case 'A':
                // Gestão de todos os cadastros do sistema
                titulo = 'Administração';
                subtitulo = 'Gerencie todas as informações neste módulo.';
                break;
            case 'G':
                // Gestão da Clínica
                titulo = 'Clínica Pires Odontologia';
                subtitulo = 'Seu sorriso é nossa maior orgulho.';
                break;
            case 'D':
                // Gestão dos pacientes de um Dentista
                titulo = 'Adriana Pires - Odontologia';
                subtitulo = 'Gerencie seus clientes neste módulo';
                break;
            default:
                // Visão do Paciente ou Responsável
                titulo = userLogged?.name;
                subtitulo = 'Seja bem-vindo!';
                break;
        }
    }

    return (
        <>
            {userLogged?.provider && (
                <Layout titulo={titulo} subtitulo={subtitulo}>
                    {children}
                </Layout>
            )}
        </>
    );
}
