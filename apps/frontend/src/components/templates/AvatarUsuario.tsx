import { authOptions, getServerAuthSession } from '@/backend/authentication/auth';
import { getServerSession, User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

interface AvatarUsuarioProps {
    className?: string;
    src?: string;
}

export default async function AvatarUsuario(props: AvatarUsuarioProps) {
    const session = await getServerAuthSession();
    return (
        <>
            <Link href="/profile" className="flex items-center">
                <Image
                    className={`ml-2 cursor-pointer rounded-full mr-2 ${props.className}`}
                    src={session?.user?.image ?? '/photo_default.jpg'}
                    width={32}
                    height={32}
                    alt="Avatar do usuário"
                />
                <p>{session?.user?.name}</p>
            </Link>
        </>
    );
}
