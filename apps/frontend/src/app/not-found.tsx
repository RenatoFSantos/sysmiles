import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function () {
    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-white">404 - Página não encontrada</h1>
                <p className="text-gray-400">A página que você está procurando não existe.</p>
                <Button variant="outline" className="mt-5 hover:bg-gray-300 border-none" asChild>
                    <Link href="/">Voltar</Link>
                </Button>
            </div>
        </div>
    );
}
