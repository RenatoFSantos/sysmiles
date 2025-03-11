'use client';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { BsTrash3 } from 'react-icons/bs';
import { FaHouseUser } from 'react-icons/fa';
import User from '@/model/User';
import ModalConfirm from './ModalConfirm';
import UserCollection from '@/postgres/db/UserCollection';
import { Phone } from 'core';
import { objModalType } from '@/types/objModalType';

interface FormUserProps {
    repo: UserCollection;
    users: User[];
    crudHeader: React.ReactNode;
    pagination: React.ReactNode;
    userEdition?: (user: User) => void;
    userDeleted?: (user: User) => void;
    userAddress?: (user: User) => void;
}

export default function FormUser({ repo, crudHeader, pagination, users, ...props }: FormUserProps) {
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [userSelect, setUserSelect] = useState<User>(User.vazio());
    const [viewAddress, setViewAddress] = useState<boolean>(false);
    const objModal: objModalType = {
        id: userSelect.uid,
        name: userSelect.userNmName,
    };

    function renderConfirm(user: User) {
        setShowConfirm(true);
        setUserSelect(user);
    }

    function deleteUser() {
        setShowConfirm(false);
        users.splice(users.map((e) => e.uid).indexOf(userSelect.uid), 1);
        repo.delete(userSelect.uid);
    }

    function editAddress(user: User) {
        setViewAddress(true);
        props.userAddress?.(user);
    }

    function renderCancel() {
        setShowConfirm(false);
    }

    const renderHead = () => {
        return (
            <>
                <div className="flex flex-row flex-1 w-full justify-around items-center py-2">
                    <div className="w-6/12 text-center">Nome</div>
                    <div className="w-2/12 text-center">Whatsapp</div>
                    <div className="w-2/12 text-center">Telefone</div>
                    <div className="w-2/12 text-center">Actions</div>
                </div>
            </>
        );
    };

    const renderUser = () => {
        if (users?.length > 0) {
            return users?.map((user, i) => {
                return (
                    <div
                        key={user.uid}
                        className="flex flex-row w-full flex-1 even:bg-gray-200 odd:bg-gray-100 items-center">
                        <div className="w-6/12 pl-2">{user.userNmName}</div>
                        <div className="w-2/12 text-center">
                            {Phone.format(user.userDsWhatsapp) || '---'}
                        </div>
                        <div className="w-2/12 text-center">
                            {Phone.format(user.userDsSmartphone) || '---'}
                        </div>
                        {renderActions(user)}
                    </div>
                );
            });
        } else {
            return (
                <div className="flex flex-row w-full flex-1 even:bg-gray-200 odd:bg-gray-100 items-center justify-center">
                    <span className="text-red-600 text-xl p-3">Nenhum registro encontrado!</span>
                </div>
            );
        }
    };

    const renderActions = (user: User) => {
        return (
            <div className="flex flex-row justify-center w-2/12">
                <button
                    onClick={() => props.userEdition?.(user)}
                    className={`text-green-600 rounded-full p-2 m-1 hover:bg-white`}>
                    <FaRegEdit size={20} />
                </button>
                <button
                    onClick={() => renderConfirm(user)}
                    className={`text-red-600 rounded-full p-2 m-1 hover:bg-white`}>
                    <BsTrash3 size={20} />
                </button>
                <button
                    onClick={() => editAddress(user)}
                    className={`text-blue-600 rounded-full p-2 m-1 hover:bg-white`}>
                    <FaHouseUser size={20} />
                </button>
            </div>
        );
    };

    return (
        <>
            {viewAddress ? (
                // <FormAddressDetail
                //     user={userSelect}
                //     btnCancel={() => formCancel()}
                //     btnSave={(address) => addressSave(address)}
                // />
                false
            ) : (
                <div className="flex flex-col flex-1 bg-gray-300 justify-start">
                    <div className={`flex w-full justify-between flex-wrap mb-2 gap-4`}>
                        {/* <h1 className="ml-3 text-2xl text-black">Cadastro de Usuários</h1> */}
                        {crudHeader}
                    </div>
                    <div className="bg-cyan-500 w-full">
                        <div className={`bg-cyan-800 text-white`}>{renderHead()}</div>
                        <div>{renderUser()}</div>
                        {pagination}
                    </div>
                </div>
            )}
            {showConfirm ? (
                <ModalConfirm
                    objModal={objModal}
                    btnOk={() => deleteUser()}
                    btnCancel={() => renderCancel()}
                />
            ) : (
                false
            )}
        </>
    );
}
