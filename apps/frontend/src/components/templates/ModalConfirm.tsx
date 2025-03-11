'use client';
import { objModalType } from '@/types/objModalType';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ModalConfirmProps {
    objModal?: objModalType;
    btnOk: () => void;
    btnCancel: () => void;
}

export default function ModalConfirm(props: ModalConfirmProps) {
    return (
        // <div>
        //     <dialog
        //         className={`fixed left-0 top-0 w-full h-screen bg-black bg-opacity-50 z50 overflow-auto backdrop-blur flex justify-center items-center`}>
        //         <div
        //             className={`flex flex-col bg-white w-1/4 h-1/5
        //                      p-5 rounded-2xl justify-center items-center`}>
        //             <h1 className="text-2xl font-semibold relative top-10 text-center">
        //                 Confirma exclusão?
        //             </h1>
        //             <h2 className="text-xl font-light relative top-10 text-center">
        //                 {props.objModal?.name}
        //             </h2>
        //             <div className={`flex w-full h-full justify-around items-end`}>
        //                 <button
        //                     className={`bg-cyan-500 rounded-xl mt-3 text-white p-2 w-1/3`}
        //                     onClick={props.btnOk}>
        //                     Ok
        //                 </button>
        //                 <button
        //                     className={`bg-cyan-500 rounded-xl mt-3 text-white p-2 w-1/3`}
        //                     onClick={props.btnCancel}>
        //                     Cancelar
        //                 </button>
        //             </div>
        //         </div>
        //     </dialog>
        // </div>
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Share</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share link</DialogTitle>
                        <DialogDescription>
                            Anyone who has this link will be able to view this.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue="https://ui.shadcn.com/docs/installation"
                                readOnly
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={props.btnCancel}>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
