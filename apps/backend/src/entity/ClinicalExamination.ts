import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export enum HigienyType {
    STANDARD = 'N',
    REGULAR = 'R',
    DEFICIENT = 'D',
}

export enum HalitosisType {
    ABSENT = 'A',
    MODERATE = 'M',
    STRONG = 'F',
}

export enum TartarusType {
    ABSENT = 'A',
    LITTLE = 'P',
    ALOT = 'M',
}

export enum GumType {
    STANDARD = 'N',
    GINGIVITIS = 'G',
    PERIODONTITIS = 'P',
}

@Entity({ name: 'ClinicalExamination' })
export class ClinicalExamination extends BaseEntity {
    @Column({
        name: 'clex_cd_hygiene',
        type: 'enum',
        enum: HigienyType,
        comment: 'Hygiene status',
        default: HigienyType.STANDARD,
    })
    clexCdHygiene: HigienyType;

    @Column({
        name: 'clex_cd_halitosis',
        type: 'enum',
        enum: HalitosisType,
        comment: 'Halitosis status',
        default: HalitosisType.ABSENT,
    })
    clexCdHalitosis: HalitosisType;

    @Column({
        name: 'clex_cd_tartarus',
        type: 'enum',
        enum: TartarusType,
        comment: 'Tartarus status',
        default: TartarusType.ABSENT,
    })
    clexCdTartarus: TartarusType;

    @Column({
        name: 'clex_cd_gum',
        type: 'enum',
        enum: GumType,
        comment: 'Gum status',
        default: GumType.STANDARD,
    })
    clexCdGum: GumType;

    @Column({
        name: 'clex_ds_nodules',
        type: 'varchar',
        length: 50,
        comment: 'Nodules',
        nullable: true,
    })
    clexDsNodules: string;

    @Column({
        name: 'clex_ds_tongue',
        type: 'varchar',
        length: 50,
        comment: 'Tongue (língua)',
        nullable: true,
    })
    clexDsTongue: string;

    @Column({
        name: 'clex_ds_palate',
        type: 'varchar',
        length: 50,
        comment: 'Palate (Palato)',
        nullable: true,
    })
    clexDsPalate: string;

    @Column({
        name: 'clex_ds_floor',
        type: 'varchar',
        length: 50,
        comment: 'Floor (Assoalho bucal)',
        nullable: true,
    })
    clexDsFloor: string;

    @Column({
        name: 'clex_ds_lips',
        type: 'varchar',
        length: 50,
        comment: 'Lips (Lábios)',
        nullable: true,
    })
    clexDsLips: string;

    @Column({
        name: 'clex_ds_skin',
        type: 'varchar',
        length: 50,
        comment: 'Skin (Pele)',
        nullable: true,
    })
    clexDsSking: string;

    @Column({
        name: 'clex_ds_vestibule',
        type: 'varchar',
        length: 50,
        comment: 'Vestibule (Vestíbulo)',
        nullable: true,
    })
    clexDsVestibule: string;

    @Column({
        name: 'clex_ds_atm',
        type: 'varchar',
        length: 100,
        comment: 'ATM',
        nullable: true,
    })
    clexDsAtm: string;

    @Column({
        name: 'clex_ds_occlusion',
        type: 'varchar',
        length: 100,
        comment: 'Occlusion (Oclusão)',
        nullable: true,
    })
    clexDsOcclusion: string;

    @Column({
        name: 'clex_ds_prosthetics',
        type: 'varchar',
        length: 100,
        comment: 'Prosthetics (Prótese)',
        nullable: true,
    })
    clexDsProsthetics: string;
}
