'use client';
import FormUser from '@/components/templates/FormUser';
import FormUserDetail from '@/components/templates/FormUserDetail';
import Layout from '@/components/templates/Layout';
import User from '@/model/User';
import UserCollection from '@/postgres/db/UserCollection';
import { useEffect, useState } from 'react';

export default function Profile() {
    const repo = new UserCollection();
    const [visible, setVisible] = useState<'table' | 'form'>('table');
    const [user, setUser] = useState<User>(User.vazio());
    const [users, setUsers] = useState<Array<User>>([]);
    const [title, setTitle] = useState('Cadastro');

    useEffect(() => {
        console.log('Entrei no useEffect');
        allUsers();
    }, []);

    function allUsers() {
        console.log('Recarregando usuários');
        repo.getAll().then((users) => {
            if (users.success) {
                const result = users.data;
                setUsers(result);
                setVisible('table');
            }
        });
    }

    function userNew() {
        setTitle('Inserir Usuário');
        setUser(User.vazio());
        setVisible('form');
    }

    function userEdition(user: User) {
        console.log('Editar usuário', user);
        setTitle('Editar Usuário');
        setUser(user);
        setVisible('form');
    }

    function userDeleted(user: User) {
        setUser(user);
        setVisible('table');
        repo.delete(user.uid);
    }

    function userSave(user: User) {
        repo.save(user).then(() => {
            allUsers();
        });
    }

    return (
        <div>
            <Layout titulo="Perfil" subtitulo="Perfil do usuário">
                <div className="flex flex-col w-full">
                    {visible === 'table' ? (
                        <FormUser
                            users={users}
                            userNew={userNew}
                            userEdition={userEdition}
                            userDeleted={userDeleted}
                        />
                    ) : (
                        <FormUserDetail
                            user={user}
                            title={title}
                            btnCancel={() => setVisible('table')}
                            btnSave={(user) => userSave(user)}
                        />
                    )}
                </div>
            </Layout>
        </div>
    );
}
