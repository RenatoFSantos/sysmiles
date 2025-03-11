import Category from '@/model/Category';

interface FormCategoryDetailProps {
    category: Category;
    btnCancel: () => void;
    btnSave: () => void;
}

export default function FormCategoryDetail({ ...props }: FormCategoryDetailProps) {
    return <div>FormCategory</div>;
}
