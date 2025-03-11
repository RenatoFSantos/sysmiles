import Category from '@/model/Category';
import CategoryCollection from '@/postgres/db/CategoryCollection';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Pagination from '@/components/templates/Pagination';

interface FormCategoryProps {
    repo: CategoryCollection;
    categorys: Array<Category>;
    crudHeader: React.ReactNode;
    pagination: React.ReactNode;
    categoryEdition: () => void;
}

export default function FormCategory({ crudHeader, pagination, ...props }: FormCategoryProps) {
    return (
        <>
            {crudHeader}
            <Table>
                <TableCaption className="font-semibold text-blue-500">
                    lista das categorias
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {pagination}
        </>
    );
}
