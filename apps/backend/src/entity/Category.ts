import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'Category' })
export class Category extends BaseEntity {
    @Column({
        name: 'cate_nm_category',
        type: 'varchar',
        length: 30,
        comment: 'Category name',
    })
    cateNmCategory: string;
}
