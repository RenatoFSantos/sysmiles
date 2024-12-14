'use client';
import Image from 'next/image';
import { iconCheck, iconWarning } from '@/components/icons';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ErrorMsg from './../../components/templates/ErrorMsg';
import { redirect, useRouter } from 'next/navigation';
import { getSession, signIn, useSession } from 'next-auth/react';
import useAuthAPI from '@/data/hook/useAuthAPI';
import { getCookie, setCookie } from 'cookies-next';

const loginSchema = z.object({
    email: z.string().email({ message: 'Email inválido!' }),
    password: z.string().min(3, { message: 'Senha inválida! Mínimo de 3 caracteres' }),
});

type createLoginFormData = z.infer<typeof loginSchema>;

export default function Authentication() {
    const capa = '/capa_adriana.jpg';
    const [error, setError] = useState(null);
    const [info, setInfo] = useState(null);
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { registerAPI } = useAuthAPI();
    const session = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<createLoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        const cookieUser = getCookie('drteeth-user');
        if (cookieUser) {
            redirect('/');
        }
    });

    const onSubmit = async (formData: any) => {
        setLoading(true);
        console.log('FormData=', formData);
        const fieldEmail = formData.email;
        const fieldPassword = formData.password;

        if (mode === 'login') {
            const data = {
                email: fieldEmail,
                password: fieldPassword,
            };
            try {
                const result = await signIn('auth-api', {
                    ...data,
                    redirect: false,
                    callbackUrl: '/',
                });
                console.log('Valor do result', result);
                if (!result.ok) {
                    console.log('Deu erro no signin');
                    await exibirError('Usuário/Senha inválidos!');
                } else {
                    router.push('/');
                }
            } catch (error) {
                await exibirError(error);
            }
        } else {
            try {
                console.log('Entrei no else', fieldEmail, fieldPassword);
                const result = await registerAPI(fieldEmail, fieldPassword);
                if (result.success) {
                    await exibirInfo('Cadastrado com sucesso!');
                    await setMode('login');
                    console.log('Result data=', result.data);
                } else {
                    console.log('Result com erro=', result.error);
                }
            } catch (error) {
                await exibirError(error);
            }
        }
    };

    const handleLoginGoogle = async () => {
        console.log('Logando com o Google');
        try {
            const result = await signIn('google', {
                redirect: false,
                callbackUrl: '/',
            });
            // console.log('Valor do result=', result);
            // const session = useSession();
            // console.log('Valor da session do google=', session);
            // if (!result.ok) {
            //     console.log('Google result=', result);
            //     await exibirError(result.error);
            // } else {
            //     const session = await getSession();
            //     console.log('Entrei com o Google', session);
            //     await setCookie('drteeth-user', JSON.stringify(session?.user));
            //     router.push('/');
            // }
        } catch (error) {
            exibirError(error);
        }
    };

    function exibirError(msg: any, timeInSeconds = 3) {
        setError(msg);
        setTimeout(() => setError(null), timeInSeconds * 1000);
        setLoading(false);
    }

    function exibirInfo(msg: any, timeInSeconds = 3) {
        setInfo(msg);
        setTimeout(() => setInfo(null), timeInSeconds * 1000);
        setLoading(false);
    }

    return (
        <>
            <div className="flex w-screen h-screen flex-1 justify-center items-center">
                <div className="hidden md:block md:w-1/2 lg:w-2/3">
                    <Image
                        className="h-screen w-full object-cover"
                        alt="Login"
                        width={1920}
                        height={1271}
                        src={capa}
                        priority
                    />
                </div>
                <div className="flex flex-col w-full md:w-1/2 m-5 lg:m-7 lg:w-1/3">
                    <div className="flex flex-col justify-center items-center text-xl">
                        <Image
                            className="object-cover"
                            src="/dentalpix_300x52px.png"
                            width={300}
                            height={52}
                            alt="Logomarca"
                        />
                        <span className="text-sm mt-2 mb-[100px]">
                            Consultório Dra. Adriana Pires - CROMG 26.970
                        </span>
                        {mode === 'login' && (
                            <span className="text-2xl font-bold">Entre com sua Conta</span>
                        )}
                        {mode === 'register' && (
                            <span className="text-2xl font-bold">Faça seu cadastro</span>
                        )}
                    </div>
                    {error && (
                        <div className="flex text-xl items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg">
                            {iconWarning}
                            <span className="ml-2">{error}</span>
                        </div>
                    )}
                    {info && (
                        <div className="flex text-xl items-center bg-green-400 text-white py-3 px-5 my-2 border border-green-200 rounded-lg">
                            {iconCheck}
                            <span className="ml-2">{info}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col w-full mt-4">
                            <label className="mt-4 ml-2 font-bold" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                className="flex bg-gray-200 border-1 focus:border-gray-100 focus:outline-none focus:bg-white mt-1 rounded-lg px-4 py-3 border-gray-300 border-2"
                                type="text"
                                required={true}
                                {...register('email')}
                            />
                            {errors.email && <ErrorMsg msg={errors.email.message} />}
                            <label className="mt-4 ml-2 font-bold" htmlFor="password">
                                Senha
                            </label>
                            <input
                                id="password"
                                className="flex bg-gray-200 border-1 focus:border-gray-100 focus:outline-none focus:bg-white mt-1 rounded-lg px-4 py-3 border-gray-300 border-2"
                                type="password"
                                required={true}
                                {...register('password')}
                            />
                            {errors.password && <ErrorMsg msg={errors.password.message} />}
                        </div>
                        <button
                            type="submit"
                            className="w-full text-2xl bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6">
                            {loading && 'Aguarde...'}
                            {!loading && mode === 'login' && 'Entrar'}
                            {!loading && mode === 'register' && 'Cadastrar'}
                        </button>
                    </form>
                    <hr className="my-6 border-gray-300 w-full" />
                    <button
                        onClick={handleLoginGoogle}
                        className="flex text-2xl justify-center w-full bg-gray-300 text-gray-700 hover:bg-gray-200 hover:text-white rounded-lg px-4 py-3">
                        <Image
                            className={`mr-2`}
                            src="/google.svg"
                            width={24}
                            height={24}
                            alt="google"
                        />
                        {mode === 'login' ? 'Entrar com Google' : 'Cadastrar com Google'}
                    </button>
                    <div className="flex justify-center">
                        {mode === 'login' && (
                            <p className="mt-8">
                                Novo por aqui?
                                <a
                                    onClick={() => setMode('register')}
                                    className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}>
                                    &nbsp;Crie uma conta gratuitamente!
                                </a>
                            </p>
                        )}
                        {mode === 'register' && (
                            <p className="mt-8">
                                Já faz parte da nossa comunidade?
                                <a
                                    onClick={() => setMode('login')}
                                    className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}>
                                    &nbsp;Entre com suas Credenciais!
                                </a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
