'use client';
import User from '@/model/User';
import { Dispatch, SetStateAction } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchUserDetail from './SearchUserDetail';
import Dentist from '@/model/Dentist';
import Botao from './Botao';
import Address from '@/model/Address';
import { object } from 'zod';

interface SearchUserProps {
    users: User[];
    setNameSearch: Dispatch<SetStateAction<String>>;
    setDentist: Dispatch<SetStateAction<Dentist>>;
}

export default function SearchUser({ users, setNameSearch, setDentist }: SearchUserProps) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const getData = setTimeout(() => {
            setNameSearch(event.target.value);
            console.log('Valor do search=', event.target.value);
        }, 500);
        return () => clearTimeout(getData);
    }

    async function selectUser(user: User) {
        const dentist = await transferUser(user);
        setDentist(() => dentist);
    }

    function transferUser(user: User) {
        const dentist: any = {
            uid: null,
            dentNrCRO: null,
            user: user,
            address: null,
        };
        return dentist;
    }

    return (
        <>
            <div className="flex flex-col ml-3">
                <div>
                    <label className="my-2">Veja se o seu nome já está em nosso cadastro:</label>
                </div>
                <div className="flex flex-1 p-1 mt-3 pl-4 border rounded-md bg-gray-300 items-center">
                    <FaSearch />
                    <input
                        id="searchField"
                        name="searchField"
                        className="focus:outline-none w-full focus:ring-0 border-gray-300 focus:border-gray-300 bg-transparent"
                        type="search"
                        placeholder="Digite seu nome aqui..."
                        alt="Buscar..."
                        onChange={handleChange}
                    />
                </div>
                {users?.length > 0 && (
                    <>
                        <div className="flex flex-col mt-5">
                            <SearchUserDetail
                                users={users}
                                selectUser={(user) => selectUser(user)}
                            />
                        </div>
                    </>
                )}
                <div className="flex flex-row mt-2 justify-end mr-2">
                    <Botao className="w-2/12" type="button" cor="cyan">
                        {users?.length > 0 ? 'Não encontrei!' : 'Novo cadastro'}
                    </Botao>
                </div>
            </div>
        </>
    );
}
