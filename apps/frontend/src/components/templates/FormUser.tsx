'use client';
import { useState } from 'react';
import { iconEdit, iconTrash } from '../icons';
import User from '@/model/User';
import Botao from './Botao';
import ModalConfirm from './ModalConfirm';

interface FormUserProps {
    users: Array<User>;
    userNew?: () => void;
    userEdition?: (user: User) => void;
    userDeleted?: (user: User) => void;
}

export default function FormUser(props: FormUserProps) {
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const showActions = props.userEdition || props.userDeleted;
    const [userSelect, setUserSelect] = useState<User>(User.vazio());

    function renderHead() {
        return (
            <>
                <div className="flex flex-row flex-1 w-full justify-around items-center py-2">
                    <div className="w-6/12 text-center">Nome</div>
                    <div className="w-2/12 text-center">Whatsapp</div>
                    <div className="w-2/12 text-center">Telefone</div>
                    {showActions ? <div className="w-2/12 text-center">Actions</div> : false}
                </div>
            </>
        );
    }

    function renderUser() {
        if (props.users?.length > 0) {
            return props.users?.map((user, i) => {
                return (
                    <div
                        key={user.uid}
                        className="flex flex-row w-full flex-1 even:bg-gray-200 odd:bg-gray-100 items-center">
                        <div className="w-6/12 pl-2">{user.userNmName}</div>
                        <div className="w-2/12 text-center">
                            {user.userDsWhatsapp || 'Não tem whatsapp'}
                        </div>
                        <div className="w-2/12 text-center">
                            {user.userDsEmail || 'Não tem Telefone'}
                        </div>
                        {showActions ? renderActions(user) : false}
                    </div>
                );
            });
        }
    }

    function renderActions(user: User) {
        return (
            <div className="flex flex-row justify-center w-2/12">
                {props.userEdition ? (
                    <button
                        onClick={() => props.userEdition?.(user)}
                        className={`text-green-600 rounded-full p-2 m-1 hover:bg-white`}>
                        {iconEdit}
                    </button>
                ) : (
                    false
                )}
                {props.userDeleted ? (
                    <button
                        onClick={() => renderConfirm(user)}
                        className={`text-red-600 rounded-full p-2 m-1 hover:bg-white`}>
                        {iconTrash(6)}
                    </button>
                ) : (
                    false
                )}
            </div>
        );
    }

    function renderConfirm(user: User) {
        setShowConfirm(true);
        setUserSelect(user);
    }

    function deleteUser() {
        setShowConfirm(false);
        props.users.splice(props.users.map((e) => e.uid).indexOf(userSelect.uid), 1);
        props.userDeleted?.(userSelect);
    }

    function renderCancel() {
        setShowConfirm(false);
    }

    return (
        <>
            <div className="flex flex-col flex-grow bg-gray-300 justify-center p-5">
                <div className={`flex justify-between flex-wrap mb-4`}>
                    <h1 className="text-3xl text-black">Cadastro de Usuários</h1>
                    <Botao cor="cyan" type="button" onClick={props.userNew}>
                        Novo Usuário
                    </Botao>
                </div>
                <div className="bg-cyan-500 w-full">
                    <div className={`bg-cyan-800 text-white`}>{renderHead()}</div>
                    <div>{renderUser()}</div>
                </div>
            </div>
            {showConfirm ? (
                <ModalConfirm
                    user={userSelect}
                    btnOk={() => deleteUser()}
                    btnCancel={() => renderCancel()}
                />
            ) : (
                false
            )}
        </>
    );
}
