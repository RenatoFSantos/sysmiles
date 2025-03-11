'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Botao from './Botao';
import { paginationType } from '@/types/paginationType';

interface PaginationProps {
    pagination: paginationType;
    setPagination: any;
}

export default function Pagination({ pagination, setPagination }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    console.log('ESTOU PAGINANDO...');
    console.log('totalRecs=', pagination.totalRecs);
    console.log('limit=', pagination.limit);
    const pages = Math.ceil(pagination.totalRecs / pagination.limit);
    console.log('pages=', pages);
    const max_itens = Math.min(pages, 5);
    console.log('max_itens=', max_itens);
    const first = Math.max(pagination.currentPage - max_itens, 1);
    console.log('first=', first);
    console.log('currentPage=', pagination.currentPage);

    function configPage(numPage: number, limitPage: number) {
        console.log('Valor do page', numPage);
        setPagination((pagination: any) => ({
            ...pagination,
            offset: (numPage - 1) * limitPage,
            currentPage: numPage,
            limit: limitPage,
        }));
        params.set('limit', limitPage.toString());
        params.set('page', numPage.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-1 w-full justify-center items-center bg-gray-100 gap-4 py-2">
            {pagination.currentPage <= 1 && (
                <Botao type="button" cor="gray" status={true}>
                    Anterior
                </Botao>
            )}
            {pagination.currentPage > 1 && (
                <Botao
                    type="button"
                    onClick={() => configPage(Number(pagination.currentPage) - 1, pagination.limit)}
                    cor="cyan"
                    status={false}>
                    Anterior
                </Botao>
            )}
            <ul className="flex flex-row justify-center">
                {Array.from({ length: max_itens })
                    .map((_, index) => index + first)
                    .map((page, index) => (
                        <li
                            key={index}
                            className={`border-2 p-2 m-1 rounded-xl ${page == pagination.currentPage ? 'border-cyan-800 text-cyan-100 bg-cyan-800 cursor-pointer' : 'border-gray-300 text-gray-800 bg-white cursor-default'}`}>
                            <button onClick={() => configPage(page, pagination.limit)}>
                                {page}
                            </button>
                        </li>
                    ))}
            </ul>
            {pagination.currentPage >= pages && (
                <Botao type="button" cor="gray" status={true}>
                    Proxima
                </Botao>
            )}
            {pagination.currentPage < pages && (
                <Botao
                    type="button"
                    onClick={() => configPage(Number(pagination.currentPage) + 1, pagination.limit)}
                    cor="cyan"
                    status={false}>
                    Proxima
                </Botao>
            )}
            <select
                className="border-2 rounded-xl border-cyan-800 text-cyan-800 hover:border-cyan-800 hover:text-cyan-800 cursor-pointer"
                defaultValue={pagination.limit}
                onChange={(e) => configPage(1, Number(e.currentTarget.value))}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    );
}
