'use client';
import { createContext, useEffect, useState } from 'react';
import { iResultHttp } from '@/interface/iResultHttp';
import UserAPI from '@/model/User';
import UserAuthModel from '@/model/UserAuth';
import Cookies from 'js-cookie';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

interface AuthContextAPIProps {
    user?: UserAuthModel;
    loading?: boolean;
    loginGoogleAPI?: () => Promise<iResultHttp>;
    loginAPI?: (email: string, password: string) => Promise<iResultHttp>;
    registerAPI?: (email: string, password: string) => Promise<iResultHttp>;
    logoutAPI?: () => void;
}

const AuthContextAPI = createContext<AuthContextAPIProps>({});

export function AuthAPIProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserAuthModel>();
    const [loading, setLoading] = useState(true);

    async function userNormalizedAPI(userAPI: UserAPI, token: string): Promise<UserAuthModel> {
        return {
            id: userAPI.uid,
            name: userAPI.userNmName ?? '',
            email: userAPI.userDsEmail ?? '',
            token,
            provider: userAPI.userCdType,
            image: userAPI.userTxAvatar ?? '',
        };
    }

    function gerenciarCookieAPI(logado: boolean, user?: UserAuthModel, token?: string) {
        if (logado) {
            Cookies.set('drteeth-auth', logado.toString(), {
                expires: 7,
            });
            Cookies.set('drteeth-user', JSON.stringify(user), {
                expires: 7,
            });
            Cookies.set('drteeth-token', token, {
                expires: 7,
            });
        } else {
            Cookies.remove('drteeth-auth');
            Cookies.remove('drteeth-user');
            Cookies.remove('drteeth-token');
        }
    }

    async function configureSessionAPI(userAPI: UserAPI, token: any) {
        if (userAPI?.userDsEmail) {
            const user = await userNormalizedAPI(userAPI, token);
            await setUser(user);
            console.log('Dentro do config=', user);
            // gerenciarCookieAPI(true, user, token);
            setLoading(false);
            return user;
        } else {
            // setUser(undefined);
            // gerenciarCookieAPI(false);
            setLoading(false);
            return user;
        }
    }

    async function loginAPI(email: string, password: string): Promise<iResultHttp> {
        return new Promise(async (resolve) => {
            try {
                setLoading(true);
                const url = process.env.NEXT_PUBLIC_URL + 'users/auth';
                const options = {
                    userDsEmail: email,
                    userCdPassword: password,
                };
                console.log('Entrendo no fetch', options);
                const result = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(options),
                });
                const json = await result.json();
                const token = json.token;
                const userAPI = json.user;
                await configureSessionAPI(userAPI, token);
                resolve({ success: true, data: user, error: null });
            } catch (error: any) {
                console.log('Entrei aqui 2');
                resolve({ success: false, data: null, error: error.message });
            } finally {
                console.log('Entrei aqui 3');
                setLoading(false);
            }
        });
    }

    async function registerAPI(email: string, password: string): Promise<iResultHttp> {
        console.log('Entrei no RegisterAPI');
        return new Promise(async (resolve) => {
            // const provider = getProviders();
            try {
                setLoading(true);
                const url = process.env.NEXT_PUBLIC_URL + 'users/create';
                const name = email.slice(0, email.indexOf('@'));
                const sigla = name.slice(0, 3);
                const options = {
                    userSgUser: sigla,
                    userNmName: name,
                    userDsEmail: email,
                    userCdPassword: password,
                    userCdRecovery: password,
                };
                const result = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(options),
                });
                const userAPI = await result.json();
                console.log('Valor de retorno = ', userAPI);
                const userConfig = await configureSessionAPI(userAPI, null);
                console.log('Valor do user configurado', userConfig);
                resolve({ success: true, data: userConfig, error: null });
            } catch (error: any) {
                resolve({ success: false, data: null, error: error.message });
            } finally {
                setLoading(false);
            }
        });
    }

    async function loginGoogleAPI(): Promise<iResultHttp> {
        return new Promise(async (resolve) => {
            const providers = [CredentialsProvider, GoogleProvider];
            try {
                setLoading(true);
                const result = await getProviders();
                console.log('Valor do providers=', result);
                resolve({ success: true, data: result.user, error: null });
            } catch (error: any) {
                resolve({ success: false, data: null, error: error.message });
            } finally {
                setLoading(false);
            }
        });
    }

    async function logoutAPI() {
        try {
            setLoading(true);
            await signOut();
            await configureSessionAPI(null, null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (Cookies.get('drteeth-auth')) {
            console.log('Cookies encontrado!');
            const cookieUser = JSON.parse(Cookies.get('drteeth-user'));
            setLoading(false);
            return setUser(cookieUser);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContextAPI.Provider
            value={{
                user,
                loading,
                loginGoogleAPI,
                loginAPI,
                registerAPI,
                logoutAPI,
            }}>
            {children}
        </AuthContextAPI.Provider>
    );
}

export default AuthContextAPI;
