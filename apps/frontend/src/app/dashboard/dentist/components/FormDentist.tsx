import ModalConfirm from '@/components/templates/ModalConfirm';
import Dentist from '@/model/Dentist';
import DentistCollection from '@/postgres/db/DentistCollection';
import { objModalType } from '@/types/objModalType';
import { Phone } from 'core';
import { useState } from 'react';
import { BsTrash3 } from 'react-icons/bs';
import { FaHouseUser, FaRegEdit } from 'react-icons/fa';

interface FormDentistProps {
    repo: DentistCollection;
    dentists: Dentist[];
    crudHeader: React.ReactNode;
    pagination: React.ReactNode;
    dentistEdition?: (dentist: Dentist) => void;
    dentistDeleted?: (dentist: Dentist) => void;
    dentistAddress?: (dentist: Dentist) => void;
}

export default function FormDentist({
    repo,
    dentists,
    crudHeader,
    pagination,
    dentistEdition,
    dentistDeleted,
    dentistAddress,
}: FormDentistProps) {
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [dentistSelect, setDentistSelect] = useState<Dentist>(Dentist.vazio());
    const [viewAddress, setViewAddress] = useState<boolean>(false);
    const objModal: objModalType = {
        id: dentistSelect.uid,
        name: dentistSelect.user?.userNmName,
    };

    function renderConfirm(dentist: Dentist) {
        setShowConfirm(true);
        setDentistSelect(dentist);
    }

    function deleteDentist() {
        setShowConfirm(false);
        dentists.splice(dentists.map((e) => e.uid).indexOf(dentistSelect.uid), 1);
        repo.delete(dentistSelect.uid);
    }

    function editAddress(dentist: Dentist) {
        setViewAddress(true);
        dentistAddress?.(dentist);
    }

    function renderCancel() {
        setShowConfirm(false);
    }

    function renderHead() {
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
    }

    function renderDentist() {
        if (dentists?.length > 0) {
            return dentists?.map((dentist, i) => {
                return (
                    <div
                        key={dentist.uid}
                        className="flex flex-row w-full flex-1 even:bg-gray-200 odd:bg-gray-100 items-center">
                        <div className="w-6/12 pl-2">{dentist.user.userNmName}</div>
                        <div className="w-2/12 text-center">
                            {Phone.format(dentist.user.userDsWhatsapp) || '---'}
                        </div>
                        <div className="w-2/12 text-center">
                            {Phone.format(dentist.user.userDsSmartphone) || '---'}
                        </div>
                        {renderActions(dentist)}
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
    }

    function renderActions(dentist: Dentist) {
        return (
            <div className="flex flex-row justify-center w-2/12">
                <button
                    onClick={() => dentistEdition(dentist)}
                    className={`text-green-600 rounded-full p-2 m-1 hover:bg-white`}>
                    <FaRegEdit size={20} />
                </button>
                <button
                    onClick={() => renderConfirm(dentist)}
                    className={`text-red-600 rounded-full p-2 m-1 hover:bg-white`}>
                    <BsTrash3 size={20} />
                </button>
                <button
                    onClick={() => editAddress(dentist)}
                    className={`text-blue-600 rounded-full p-2 m-1 hover:bg-white`}>
                    <FaHouseUser size={20} />
                </button>
            </div>
        );
    }

    return (
        <>
            {viewAddress ? (
                // <FormAddressDetail
                //     dentist={dentistSelect}
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
                        <div>{renderDentist()}</div>
                        {pagination}
                    </div>
                </div>
            )}
            {showConfirm ? (
                <ModalConfirm
                    objModal={objModal}
                    btnOk={() => deleteDentist()}
                    btnCancel={() => renderCancel()}
                />
            ) : (
                false
            )}
        </>
    );
}
