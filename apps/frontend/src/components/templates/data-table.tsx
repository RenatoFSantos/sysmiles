'use client';

import {
    ColumnDef,
    ColumnFiltersState,
    Row,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePathname, useRouter } from 'next/navigation';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageSize?: number;
    filter?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageSize = 10,
    filter,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize,
            },
            columnVisibility: {
                uid: false,
            },
        },
        state: {
            sorting,
            columnFilters,
        },
    });
    const router = useRouter();
    const path = usePathname();

    function handleActions(cellId: string, rowId: string) {
        console.log('cellId=', cellId);
        console.log('rowId=', rowId);
        const actions = cellId.split('_');
        switch (actions[1]) {
            case 'edit':
                router.push(`${path}/${rowId}`);
                break;
            case 'delete':
                console.log('Data=', data[+actions[0]]);
                break;

            default:
                break;
        }
    }

    return (
        <div>
            {filter && (
                <div>
                    <div className="flex flex-col py-4">
                        <Label htmlFor={filter} className="pl-2 pb-2">
                            {filter.toUpperCase()}
                        </Label>
                        <Input
                            id={filter}
                            placeholder={`Filtre o ${filter}...`}
                            value={(table.getColumn(`${filter}`)?.getFilterValue() as string) ?? ''}
                            onChange={(event) =>
                                table.getColumn(`${filter}`)?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    </div>
                </div>
            )}
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="text-xl bg-drteeth-700">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-drteeth-700">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-white">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="py-1"
                                            onClick={() =>
                                                handleActions(cell.id, row.getValue('uid'))
                                            }>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sem resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="pt-5">
                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
