'use client';
import useModalLogout from '@/data/hook/useModalLogout';
import { signOut } from 'next-auth/react';
import Cookies from 'js-cookie';

interface ModalLogoutProps {
    title: string;
    subtitle?: string;
}

function ModalLogout(props: ModalLogoutProps) {
    const { show, setShow } = useModalLogout();

    function confirmModal() {
        setShow(false);
        exitApp();
    }

    async function exitApp() {
        await Cookies.remove('next-auth.session-token');
        await Cookies.remove('drteeth-user');
        await Cookies.remove('drteeth-token');
        await signOut({
            callbackUrl: '/',
        });
        // await Cookies.remove('next-auth.callback-url');
        // await Cookies.remove('next-auth.csrf-token');
    }

    return (
        <>
            {show && (
                <dialog
                    className={`fixed left-0 top-0 w-full h-screen bg-black bg-opacity-50 z50 overflow-auto backdrop-blur flex justify-center items-center`}>
                    <div
                        className={`flex flex-col bg-white w-1/4 h-1/5
                             p-5 rounded-2xl justify-center items-center`}>
                        <h1 className="text-2xl font-semibold relative top-10 text-center">
                            {props.title}
                        </h1>
                        <h2 className="text-xl font-light relative top-10 text-center">
                            {props.subtitle}
                        </h2>
                        <div className={`flex w-full h-full justify-around items-end`}>
                            <button
                                className={`bg-cyan-500 rounded-xl mt-3 text-white p-2 w-1/3`}
                                onClick={confirmModal}>
                                Ok
                            </button>
                            <button
                                className={`bg-cyan-500 rounded-xl mt-3 text-white p-2 w-1/3`}
                                onClick={() => setShow(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}

export default ModalLogout;
