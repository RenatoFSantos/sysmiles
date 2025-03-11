import User from '@/model/User';
import { Phone } from 'core';
import { FaArrowRight } from 'react-icons/fa6';

interface SearchUserDetailProps {
    users: User[];
    selectUser?: (user: User) => void;
}

export default function SearchUserDetail({ users, selectUser }: SearchUserDetailProps) {
    function renderHead() {
        return (
            <>
                <div className="flex flex-row flex-1 w-full justify-around items-center py-2">
                    <div className="w-6/12 text-center">Nome</div>
                    <div className="w-2/12 text-center">Whatsapp</div>
                    <div className="w-2/12 text-center">Telefone</div>
                    <div className="w-2/12 text-center">Selecione</div>
                </div>
            </>
        );
    }

    function renderUser() {
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
    }

    function renderActions(user: User) {
        return (
            <div className="flex flex-row justify-center w-2/12">
                <button
                    onClick={() => selectUser(user)}
                    className={`text-green-600 rounded-full p-2 m-1 hover:bg-white`}>
                    <FaArrowRight size={20} />
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col flex-1 bg-gray-300 justify-start">
                <div className="bg-cyan-500 w-full">
                    <div className={`bg-cyan-800 text-white`}>{renderHead()}</div>
                    <div>{renderUser()}</div>
                </div>
            </div>
        </>
    );
}
