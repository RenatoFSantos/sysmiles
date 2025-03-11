'use client';

import { normalizeSmartphoneNumber } from '@/mask/Mask';
import { ColumnDef } from '@tanstack/react-table';
import { Edit2Icon, Trash2Icon, ArrowUpDown } from 'lucide-react';
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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    uid: string;
    amount: number;
    phone: string;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'uid',
        header: 'Uid',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="text-xl"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ row }) => {
            const formatted = normalizeSmartphoneNumber(row.getValue('phone')) || '';
            return <div className="text-center font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'amount',
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            const formatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        id: 'edit',
        cell: ({ row }) => {
            const payment = row.original;
            return (
                <div className="flex justify-center">
                    <Button variant="outline" className="h-8 w-8 p-0">
                        <Edit2Icon className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
    {
        id: 'delete',
        cell: ({ row }) => {
            const payment = row.original;
            return (
                <div className="flex justify-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="h-8 w-8 p-0">
                                <Trash2Icon className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Confirma Exclusão?</DialogTitle>
                                <DialogDescription>{payment.email}</DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-end">
                                <DialogClose asChild>
                                    <Button type="submit" variant="secondary">
                                        Confirma
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
