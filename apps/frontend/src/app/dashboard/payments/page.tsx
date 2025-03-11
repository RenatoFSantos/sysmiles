import { Payment, columns } from './columns';
import { DataTable } from '../../../components/templates/data-table';

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            uid: '728ed52f',
            amount: 100,
            status: 'pending',
            phone: '32999343576',
            email: 'm@exampl e.com',
        },
        {
            uid: '5482adf',
            amount: 200,
            status: 'processing',
            phone: '3298845-5566',
            email: 'renato@example.com',
        },
        {
            uid: '728ed52fa',
            amount: 100,
            status: 'pending',
            phone: '32999343576',
            email: 'm@example.com',
        },
        {
            uid: '5482adfb',
            amount: 200,
            status: 'processing',
            phone: '3298845-5566',
            email: 'renato@example.com',
        },
        {
            uid: '728ed52fc',
            amount: 100,
            status: 'pending',
            phone: '32999343576',
            email: 'm@example.com',
        },
        {
            uid: '5482adfd',
            amount: 200,
            status: 'processing',
            phone: '3298845-5566',
            email: 'renato@example.com',
        },
        {
            uid: '728ed52fe',
            amount: 100,
            status: 'pending',
            phone: '32999343576',
            email: 'm@example.com',
        },
        {
            uid: '5482adff',
            amount: 200,
            status: 'processing',
            phone: '3298845-5566',
            email: 'renato@example.com',
        },
        {
            uid: '728ed52fg',
            amount: 100,
            status: 'pending',
            phone: '32999343576',
            email: 'm@example.com',
        },
        {
            uid: '5482adfhg',
            amount: 200,
            status: 'processing',
            phone: '3298845-5566',
            email: 'renato@example.com',
        },
        {
            uid: '728ed52fi',
            amount: 100,
            status: 'pending',
            phone: '32999343576',
            email: 'm@example.com',
        },
        {
            uid: '5482adfj',
            amount: 200,
            status: 'processing',
            phone: '3298845-5566',
            email: 'renato@example.com',
        },
        // ...
    ];
}

export default async function PaymentPage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} filter={'email'} />
        </div>
    );
}
