'use client';
import UserAuthModel from '@/model/UserAuth';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    GoogleAuthProvider,
    User,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/firebase/config';
import Cookies from 'js-cookie';
import { iResultHttp } from '@/interface/iResultHttp';

interface AuthContextFirebaseProps {
    user?: UserAuthModel;
    loading?: boolean;
    loginGoogle?: () => Promise<iResultHttp>;
    login?: (email: string, password: string) => Promise<iResultHttp>;
    register?: (email: string, password: string) => Promise<iResultHttp>;
    logout?: () => void;
}

const AuthContextFirebase = createContext<AuthContextFirebaseProps>({});

async function userNormalized(userFirebase: User): Promise<UserAuthModel> {
    const token = await userFirebase.getIdToken();
    return {
        uid: userFirebase.uid,
        name: userFirebase.displayName ?? '',
        email: userFirebase.email ?? '',
        token,
        provider: userFirebase.providerData[0]?.providerId ?? '',
        imageUrl: userFirebase.photoURL ?? '',
    };
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('drteeth-auth', logado.toString(), {
            expires: 7,
        });
    } else {
        Cookies.remove('drteeth-auth');
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<UserAuthModel>();
    const [loading, setLoading] = useState(true);

    async function configureSession(userFirebase: any) {
        if (userFirebase?.email) {
            const user = await userNormalized(userFirebase);
            setUser(user);
            gerenciarCookie(true);
            setLoading(false);
            return user.email;
        } else {
            setUser(undefined);
            gerenciarCookie(false);
            setLoading(false);
            return false;
        }
    }

    async function login(email: string, password: string): Promise<iResultHttp> {
        return new Promise(async (resolve) => {
            const provider = new GoogleAuthProvider();
            try {
                setLoading(true);
                const result = await signInWithEmailAndPassword(auth, email, password);
                const credential = await GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                await configureSession(result.user);
                resolve({ success: true, data: result.user, error: null });
            } catch (error: any) {
                resolve({ success: false, data: null, error: error.message });
            } finally {
                setLoading(false);
            }
        });
    }

    async function register(email: string, password: string): Promise<iResultHttp> {
        return new Promise(async (resolve) => {
            const provider = new GoogleAuthProvider();
            try {
                setLoading(true);
                const result = await createUserWithEmailAndPassword(auth, email, password);
                const credential = await GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                await configureSession(result.user);
                resolve({ success: true, data: result.user, error: null });
            } catch (error: any) {
                resolve({ success: false, data: null, error: error.message });
            } finally {
                setLoading(false);
            }
        });
    }

    async function loginGoogle(): Promise<iResultHttp> {
        return new Promise(async (resolve) => {
            const provider = new GoogleAuthProvider();
            try {
                setLoading(true);
                const result = await signInWithPopup(auth, provider);
                const credential = await GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                console.log('Result = ', result);
                console.log('Credential = ', credential);
                console.log('token = ', token);
                await configureSession(result.user);
                resolve({ success: true, data: result.user, error: null });
            } catch (error: any) {
                resolve({ success: false, data: null, error: error.message });
            } finally {
                setLoading(false);
            }
        });
    }

    async function logout() {
        try {
            setLoading(true);
            await auth.signOut();
            await configureSession(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (Cookies.get('drteeth-auth')) {
            setLoading(false);
            const cancelAuth = auth.onIdTokenChanged(configureSession);
            return () => cancelAuth();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContextFirebase.Provider
            value={{
                user,
                loading,
                loginGoogle,
                login,
                register,
                logout,
            }}>
            {children}
        </AuthContextFirebase.Provider>
    );
}

export default AuthContextFirebase;
