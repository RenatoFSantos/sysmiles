import Address from '@/model/Address';
import AddressCollection from '@/postgres/db/AddressCollection';
import { Phone } from 'core';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { BsTrash3 } from 'react-icons/bs';
import ModalConfirm from '@/components/templates/ModalConfirm';
import { objModalType } from '@/types/objModalType';

interface FormAdressProps {
    repo: AddressCollection;
    addresss: Address[];
    crudHeader: React.ReactNode;
    pagination: React.ReactNode;
    addressEdition?: (address: Address) => void;
}

export default function FormAddress({
    repo,
    addresss,
    crudHeader,
    pagination,
    ...props
}: FormAdressProps) {
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [addressSelect, setAddressSelect] = useState<Address>(Address.vazio());
    const objModal: objModalType = {
        id: addressSelect.uid,
        name: addressSelect.addrNmAddress,
    };

    function renderConfirm(address: Address) {
        setShowConfirm(true);
        setAddressSelect(address);
    }

    function deleteAddress() {
        setShowConfirm(false);
        addresss.splice(addresss.map((e) => e.uid).indexOf(addressSelect.uid), 1);
        repo.delete(addressSelect.uid);
    }

    function renderCancel() {
        setShowConfirm(false);
    }

    function renderHead() {
        return (
            <>
                <div className="flex flex-row flex-1 w-full justify-around items-center py-2">
                    <div className="w-6/12 text-center">Nome</div>
                    <div className="w-2/12 text-center">Contato</div>
                    <div className="w-2/12 text-center">Telefone</div>
                    <div className="w-2/12 text-center">Actions</div>
                </div>
            </>
        );
    }

    function renderAddress() {
        if (addresss?.length > 0) {
            return addresss?.map((address, i) => {
                return (
                    <div
                        key={address.uid}
                        className="flex flex-row w-full flex-1 even:bg-gray-200 odd:bg-gray-100 items-center">
                        <div className="w-6/12 pl-2">{address.addrNmAddress}</div>
                        <div className="w-2/12 text-center">{address.addrNmContact || '---'}</div>
                        <div className="w-2/12 text-center">
                            {Phone.format(address.addrDsPhone) || '---'}
                        </div>
                        {renderActions(address)}
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

    function renderActions(address: Address) {
        return (
            <div className="flex flex-row justify-center w-2/12">
                <button
                    onClick={() => props.addressEdition?.(address)}
                    className={`text-green-600 rounded-full p-2 m-1 hover:bg-white`}>
                    <FaRegEdit size={20} />
                </button>
                <button
                    onClick={() => renderConfirm(address)}
                    className={`text-red-600 rounded-full p-2 m-1 hover:bg-white`}>
                    <BsTrash3 size={20} />
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col flex-1 bg-gray-300 justify-start">
                <div className={`flex w-full justify-between flex-wrap mb-2 gap-4`}>
                    {/* <h1 className="ml-3 text-2xl text-black">Cadastro de Usuários</h1> */}
                    {crudHeader}
                </div>
                <div className="bg-cyan-500 w-full">
                    <div className={`bg-cyan-800 text-white`}>{renderHead()}</div>
                    <div>{renderAddress()}</div>
                    {pagination}
                </div>
            </div>
            {showConfirm ? (
                <ModalConfirm
                    objModal={objModal}
                    btnOk={() => deleteAddress()}
                    btnCancel={() => renderCancel()}
                />
            ) : (
                false
            )}
        </>
    );
}
