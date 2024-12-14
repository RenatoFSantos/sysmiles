import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'Anamnesis' })
export class Anamnesis extends BaseEntity {
    @Column({
        name: 'anam_ds_claim',
        type: 'varchar',
        length: 500,
        comment: 'Claim',
        nullable: true,
    })
    anamDsClaim: string;

    @Column({
        name: 'anam_in_anemia',
        type: 'boolean',
        comment: 'Anemia',
        nullable: true,
    })
    anamInAnemia: boolean;

    @Column({
        name: 'anam_in_arthritis',
        type: 'boolean',
        comment: 'Arthritis',
        nullable: true,
    })
    anamInArthritis: boolean;

    @Column({
        name: 'anam_in_bruxism',
        type: 'boolean',
        comment: 'Bruxism',
        nullable: true,
    })
    anamInBruxism: boolean;

    @Column({
        name: 'anam_in_cancer',
        type: 'boolean',
        comment: 'Cancer',
        nullable: true,
    })
    anamInCancer: boolean;

    @Column({
        name: 'anam_in_convulsion',
        type: 'boolean',
        comment: 'Convulsion',
        nullable: true,
    })
    anamInConvulsion: boolean;

    @Column({
        name: 'anam_in_diabetes',
        type: 'boolean',
        comment: 'Diabetes',
        nullable: true,
    })
    anamInDiabetes: boolean;

    @Column({
        name: 'anam_in_pregnant',
        type: 'boolean',
        comment: 'Pregnant',
        nullable: true,
    })
    anamInPregnant: boolean;

    @Column({
        name: 'anam_in_dst_hiv',
        type: 'boolean',
        comment: 'DST/HIV',
        nullable: true,
    })
    anamInDstHiv: boolean;

    @Column({
        name: 'anam_in_rheumatic_fever',
        type: 'boolean',
        comment: 'Rheumatic Fever',
        nullable: true,
    })
    anamInRheumaticFever: boolean;

    @Column({
        name: 'anam_in_bleeding',
        type: 'boolean',
        comment: 'Bleeding',
        nullable: true,
    })
    anamInBleeding: boolean;

    @Column({
        name: 'anam_in_hepatitis',
        type: 'boolean',
        comment: 'Hepatitis',
        nullable: true,
    })
    anamInHepatitis: boolean;

    @Column({
        name: 'anam_in_herpes',
        type: 'boolean',
        comment: 'Herpes',
        nullable: true,
    })
    anamInHerpes: boolean;

    @Column({
        name: 'anam_in_hypertension',
        type: 'boolean',
        comment: 'Hypertension',
        nullable: true,
    })
    anamInHypertension: boolean;

    @Column({
        name: 'anam_in_pacemaker',
        type: 'boolean',
        comment: 'Pacemaker',
        nullable: true,
    })
    anamInPacemaker: boolean;

    @Column({
        name: 'anam_in_osteoporosis',
        type: 'boolean',
        comment: 'Osteoporosis',
        nullable: true,
    })
    anamInOsteoporosis: boolean;

    @Column({
        name: 'anam_in_heart_problems',
        type: 'boolean',
        comment: 'Heart Problems',
        nullable: true,
    })
    anamInHeartProblems: boolean;

    @Column({
        name: 'anam_in_gastric_problems',
        type: 'boolean',
        comment: 'Gastric Problems',
        nullable: true,
    })
    anamInGastricProblems: boolean;

    @Column({
        name: 'anam_in_kidney_problems',
        type: 'boolean',
        comment: 'Kidney Problems',
        nullable: true,
    })
    anamInKidneyProblems: boolean;

    @Column({
        name: 'anam_in_breathing_problems',
        type: 'boolean',
        comment: 'Breathing Problems',
        nullable: true,
    })
    anamInBreathingProblems: boolean;

    @Column({
        name: 'anam_in_smoke',
        type: 'boolean',
        comment: 'Smoke',
        nullable: true,
    })
    anamInSmoke: boolean;

    @Column({
        name: 'anam_ds_other',
        type: 'varchar',
        length: 100,
        comment: 'Other problems',
        nullable: true,
    })
    anamDsOther: string;

    @Column({
        name: 'anam_ds_continuous_medication',
        type: 'varchar',
        length: 200,
        comment: 'Continuous medication',
        nullable: true,
    })
    anamDsContinuousMedication: string;

    @Column({
        name: 'anam_ds_allergy',
        type: 'varchar',
        length: 200,
        comment: 'Allergy',
        nullable: true,
    })
    anamDsAllergy: string;

    @Column({
        name: 'anam_tx_observation',
        type: 'varchar',
        length: 500,
        comment: 'Observation',
        nullable: true,
    })
    anamTxObservation: string;
}
