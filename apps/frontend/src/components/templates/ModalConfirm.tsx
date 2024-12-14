'use client';
import User from '@/model/User';

interface ModalConfirmProps {
    user: User;
    btnOk: () => void;
    btnCancel: () => void;
}

export default function ModalConfirm(props: ModalConfirmProps) {
    return (
        <div>
            <dialog
                className={`fixed left-0 top-0 w-full h-screen bg-black bg-opacity-50 z50 overflow-auto backdrop-blur flex justify-center items-center`}>
                <div
                    className={`flex flex-col bg-white w-1/4 h-1/5
                             p-5 rounded-2xl justify-center items-center`}>
                    <h1 className="text-2xl font-semibold relative top-10 text-center">
                        Confirma exclusão?
                    </h1>
                    <h2 className="text-xl font-light relative top-10 text-center">
                        Usuário: {props.user?.userNmName}
                    </h2>
                    <div className={`flex w-full h-full justify-around items-end`}>
                        <button
                            className={`bg-cyan-500 rounded-xl mt-3 text-white p-2 w-1/3`}
                            onClick={props.btnOk}>
                            Ok
                        </button>
                        <button
                            className={`bg-cyan-500 rounded-xl mt-3 text-white p-2 w-1/3`}
                            onClick={props.btnCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
