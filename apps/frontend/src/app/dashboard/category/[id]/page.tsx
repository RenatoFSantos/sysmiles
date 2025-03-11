'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    cateNmCategory: z.string().min(2, { message: 'Nome deve ser maior que 2 caracteres!' }),
});

export default function CategoryDetail() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cateNmCategory: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Valores=', values);
    }

    return (
        <div className="flex flex-col w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="cateNmCategory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <FormControl>
                                    <Input placeholder="categoria" {...field} />
                                </FormControl>
                                <FormDescription>Informe o nome da categoria</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant="outline">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
