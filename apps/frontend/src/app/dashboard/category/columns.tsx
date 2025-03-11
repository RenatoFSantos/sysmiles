'use client';

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
import Category from '@/model/Category';

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'uid',
        header: 'Uid',
    },
    {
        accessorKey: 'cateNmCategory',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="text-xl"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Categoria
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
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
            const category = row.original;
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
                                <DialogDescription>{category.cateNmCategory}</DialogDescription>
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
