'use client';
import CrudHeader from '@/components/templates/CrudHeader';
import FormUser from '@/components/templates/FormUser';
import FormUserDetail from '@/components/templates/FormUserDetail';
import Layout from '@/components/templates/Layout';
import Pagination from '@/components/templates/Pagination';
import SearchInput from '@/components/templates/SearchInput';
import User from '@/model/User';
import UserCollection from '@/postgres/db/UserCollection';
import { paginationType } from '@/types/paginationType';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(searchParams);
    const repo = new UserCollection();
    const [visible, setVisible] = useState<'table' | 'form'>('table');
    const [user, setUser] = useState<User>(User.vazio());
    const [users, setUsers] = useState<Array<User>>([]);
    const sort = 'user_nm_name';
    const newPagination: paginationType = {
        currentPage: 1,
        offset: 0,
        totalRecs: 0,
        limit: 10,
    };
    const [pagination, setPagination] = useState<paginationType>(newPagination);

    useEffect(() => {
        console.log('Parametros alterados', pagination);
        setParams();
    }, [searchParams]);

    function setParams() {
        const pLimit = params.get('limit') || pagination.limit;
        const pPage = params.get('page') || pagination.currentPage;
        params.set('limit', pLimit?.toString());
        params.set('page', pPage?.toString());
        params.set('sort', sort);
        params.set('field_search', 'user_nm_name');
        params.set('search', params.get('user_nm_name'));

        console.log('Effect (page, currentPage)', params.get('page'), pagination.currentPage);
        allUsers();
    }

    function allUsers() {
        console.log('Params=', params.toString());
        repo.getAll(params).then((allUsers) => {
            if (allUsers.success) {
                const usersData = allUsers.data;
                const result = usersData.result;
                setUsers(() => result);
                console.log('depois do allUser', pagination);
                setPagination((prevState: any) => ({
                    ...prevState,
                    limit: params.get('limit'),
                    currentPage: params.get('page'),
                    totalRecs: usersData.pagination.total,
                }));
                console.log('Novos valor pagination=', pagination);
            }
        });
    }

    function userNew() {
        setUser(User.vazio());
        setVisible('form');
    }

    function userEdition(user: User) {
        setUser(user);
        setVisible('form');
    }

    function userAddress(user: User) {
        setUser(user);
        router.push('/address');
    }

    function userSave(user: User) {
        repo.save(user).then(() => {
            setVisible('table');
            setParams();
        });
    }

    function formCancel() {
        setVisible('table');
        setParams();
    }

    return (
        <div className="flex flex-col w-full pl-0">
            {visible === 'table' ? (
                <FormUser
                    repo={repo}
                    users={users}
                    crudHeader={
                        <CrudHeader
                            title="Cadastro de Usuário"
                            searchInput={<SearchInput field="user_nm_name" />}
                            newButton={userNew}
                        />
                    }
                    pagination={
                        <Pagination pagination={pagination} setPagination={setPagination} />
                    }
                    userEdition={userEdition}
                    userAddress={userAddress}
                />
            ) : (
                <FormUserDetail
                    user={user}
                    btnCancel={() => formCancel()}
                    btnSave={(user) => userSave(user)}
                />
            )}
        </div>
    );
}
