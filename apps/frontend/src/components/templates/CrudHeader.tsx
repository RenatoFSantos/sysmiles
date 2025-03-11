'use client';
import Botao from './Botao';

interface CrudHeaderProps {
    title: string;
    searchInput?: React.ReactNode;
    newButton?: () => void;
}

export default function CrudHeader({ title, searchInput, newButton }: CrudHeaderProps) {
    return (
        <div className={`flex w-full justify-between flex-wrap mb-2 gap-4`}>
            <h1 className="ml-3 text-2xl text-black">{title}</h1>
            <div className="flex justify-end gap-4">
                {searchInput && searchInput}
                {newButton && (
                    <Botao className="px-4" cor="cyan" type="button" onClick={newButton}>
                        Inserir
                    </Botao>
                )}
            </div>
        </div>
    );
}
