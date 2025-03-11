'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface AvatarUsuarioProps {
    className?: string;
    src?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const session = useSession();
    return (
        <>
            <Link href="/profile" className="flex items-center">
                <Image
                    className={`ml-2 cursor-pointer rounded-full mr-2 ${props.className}`}
                    src={session.data?.user?.image ?? '/photo_default.jpg'}
                    width={32}
                    height={32}
                    alt="Avatar do usuário"
                />
                <p>{session.data?.user?.name}</p>
            </Link>
        </>
    );
}
