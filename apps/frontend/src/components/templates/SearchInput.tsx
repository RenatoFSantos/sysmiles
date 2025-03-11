'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
    field: string;
}

export default function SearchInput({ field }: SearchInputProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    useEffect(() => {
        console.log('Effect do SearchInput');
        (document.getElementById('searchField') as HTMLInputElement).value =
            searchParams.get(field);
    }, []);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const getData = setTimeout(() => {
            const searchValue = event.target.value;
            if (searchValue) {
                params.set(`${field}`, searchValue);
                params.set('page', '1');
            } else {
                params.delete(`${field}`);
            }
            replace(`${pathname}?${params.toString()}`);
        }, 500);
        return () => clearTimeout(getData);
    }

    return (
        <div>
            <div className="flex flex-1 p-1 pl-4 border rounded-md bg-gray-300 items-center">
                <FaSearch />
                <input
                    id="searchField"
                    name="searchField"
                    className="focus:outline-none focus:ring-0 border-gray-300 focus:border-gray-300 bg-transparent"
                    type="search"
                    placeholder="Busque por nome..."
                    alt="Buscar..."
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
