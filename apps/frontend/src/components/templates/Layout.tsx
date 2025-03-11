import { Toaster, toast } from 'sonner';
import Cabecalho from './Cabecalho';
import Conteudo from './Conteudo';
import MenuLateral from './MenuLateral';
import Rodape from './Rodape';
import { ModalProvider } from '@/data/context/ModalContext';
import ModalLogout from './ModalLogout';

interface LayoutProps {
    titulo: string;
    subtitulo: string;
    children?: React.ReactNode;
}

export default function Layout({ titulo, subtitulo, children }: LayoutProps) {
    return (
        <ModalProvider>
            <div className="flex w-screen h-screen justify-center items-center">
                <Toaster position="top-right" richColors />
                <div className={`flex flex-col bg-gray-300 dark:bg-gray-800 w-full h-full`}>
                    <Cabecalho titulo={titulo} subtitulo={subtitulo} />
                    <div className="flex flex-1 overflow-hidden">
                        <div className={`flex dark:text-white overflow-hidden`}>
                            <MenuLateral />
                        </div>
                        <div className="flex flex-1 overflow-y-auto pr-5">
                            <Conteudo>{children}</Conteudo>
                        </div>
                    </div>
                    <ModalLogout title="Deseja sair do sistema?" />
                    <div className={`mb-0 font-light`}>
                        <Rodape copyright="Copyright © 2024 - Midilabs - Mídias Digitais Ltda." />
                    </div>
                </div>
            </div>
        </ModalProvider>
    );
}
