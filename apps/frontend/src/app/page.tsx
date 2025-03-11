import { getServerAuthSession } from '@/backend/authentication/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getServerAuthSession();

    if (!session?.user) {
        redirect('/authentication');
    } else {
        redirect('/dashboard');
    }
}
