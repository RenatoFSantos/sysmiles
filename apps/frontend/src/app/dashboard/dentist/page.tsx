'use client';
import Layout from '@/components/templates/Layout';
import { useEffect, useState } from 'react';
import CrudHeader from '@/components/templates/CrudHeader';
import SearchInput from '@/components/templates/SearchInput';
import Pagination from '@/components/templates/Pagination';
import { paginationType } from '@/types/paginationType';
import { useRouter, useSearchParams } from 'next/navigation';
import FormDentist from './components/FormDentist';
import FormDentistDetail from './components/FormDentistDetail';
import DentistCollection from '@/postgres/db/DentistCollection';
import Dentist from '@/model/Dentist';
import SearchUser from '@/components/templates/SearchUser';
import User from '@/model/User';
import UserCollection from '@/postgres/db/UserCollection';

interface DentistProps {}

export default function DentistPage({}: DentistProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(searchParams);
    const repo = new DentistCollection();
    const repoUser = new UserCollection();
    const [visible, setVisible] = useState<'form' | 'table' | 'search'>('table');
    const [dentist, setDentist] = useState<Dentist>(Dentist.vazio());
    const [dentists, setDentists] = useState<Array<Dentist>>([]);
    const [users, setUsers] = useState<Array<User>>([]);
    const [nameSearch, setNameSearch] = useState(null);
    const sort = 'dent_nm_dentist';
    const newPagination: paginationType = {
        currentPage: 1,
        offset: 0,
        totalRecs: 0,
        limit: 10,
    };
    const [pagination, setPagination] = useState<paginationType>(newPagination);

    useEffect(() => {
        allUsers(nameSearch);
    }, [nameSearch]);

    useEffect(() => {
        setParams();
    }, [searchParams]);

    useEffect(() => {
        if (dentist?.user) {
            setVisible('form');
        }
    }, [dentist]);

    function setParams() {
        console.log('Valor do dentist=', dentist);
        const pLimit = params.get('limit') || pagination.limit;
        const pPage = params.get('page') || pagination.currentPage;
        params.set('limit', pLimit?.toString());
        params.set('page', pPage?.toString());
        params.set('sort', sort);

        console.log('Effect (page, currentPage)', params.get('page'), pagination.currentPage);
        allDentist();
    }

    function allDentist() {
        console.log('Params=', params.toString());
        repo.getAll(params).then((listDentist) => {
            if (listDentist.success) {
                const dentistsData = listDentist.data;
                const result = dentistsData.result;
                setDentists(() => result);
                console.log('depois do allDentist', pagination);
                setPagination((prevState: any) => ({
                    ...prevState,
                    limit: params.get('limit'),
                    currentPage: params.get('page'),
                    totalRecs: dentistsData?.pagination?.total,
                }));
                console.log('Novos valor pagination=', pagination);
            }
        });
    }

    function allUsers(search: string) {
        if (search !== null && search !== '') {
            params.set('user_nm_name', search);
            params.set('sort', 'user_nm_name');
            repoUser.getAll(params).then((listUsers) => {
                if (listUsers.success) {
                    const usersData = listUsers.data;
                    const result = usersData.result;
                    setUsers(() => result);
                }
            });
        } else {
            setUsers(() => null);
        }
    }

    function dentistNew() {
        setDentist(Dentist.vazio());
        setVisible('search');
    }

    function dentistEdition(dentist: Dentist) {
        setDentist(dentist);
        setVisible('form');
    }

    function dentistSave(dentist: Dentist) {
        repo.save(dentist).then(() => {
            setVisible('table');
            setParams();
        });
    }

    function formCancel() {
        setVisible('table');
        setParams();
    }

    const renderData = () => {
        switch (visible) {
            case 'table':
                return (
                    <FormDentist
                        repo={repo}
                        dentists={dentists}
                        crudHeader={
                            <CrudHeader
                                title="Cadastro de Dentistas"
                                searchInput={<SearchInput field="user_nm_name" />}
                                newButton={dentistNew}
                            />
                        }
                        pagination={
                            <Pagination pagination={pagination} setPagination={setPagination} />
                        }
                        dentistEdition={dentistEdition}
                    />
                );
            case 'search':
                return (
                    <SearchUser
                        users={users}
                        setNameSearch={setNameSearch}
                        setDentist={setDentist}
                    />
                );
            case 'form':
                return (
                    <FormDentistDetail
                        dentist={dentist}
                        btnCancel={() => formCancel()}
                        btnSave={(dentist: Dentist) => dentistSave(dentist)}
                    />
                );
        }
    };

    return (
        <div>
            <Layout titulo="Dentistas" subtitulo="Listagem de dentistas">
                <div className="flex flex-col w-full pl-0 pr-5">{renderData()}</div>
            </Layout>
        </div>
    );
}
