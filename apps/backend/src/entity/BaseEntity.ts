import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column({ default: true, comment: 'Active: 0 = False/ 1 = true' })
    active: boolean;

    @Column({ default: false, comment: 'Deleted: 0 = False/ 1 = true' })
    deleted: boolean;

    @CreateDateColumn({
        type: 'timestamp',
        precision: 6,
        comment: 'Creation date',
    })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', precision: 6, comment: 'Update date' })
    updated: Date;
}
