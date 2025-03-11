import { columns } from './columns';
import { DataTable } from '../../../components/templates/data-table';
import Category from '@/model/Category';
import CategoryCollection from '@/postgres/db/CategoryCollection';

export default async function CategoryPage({ params }: any) {
    const repo = new CategoryCollection();
    const data = await getData();

    async function getData(): Promise<Category[]> {
        console.log('Buscando as categorias...');
        let listData: Array<Category> = [];
        try {
            const allData = await repo.getAll(params);
            console.log('Todas categorias allData,', allData);
            if (allData.success) {
                listData = allData.data;
                return listData;
            }
        } catch (error) {
            throw error;
        }
        console.log('Saindo da busca de categorias..');
        return listData;
    }

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} filter={'cateNmCategory'} />
        </div>
    );
}
