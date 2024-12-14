import { BaseEntity } from './BaseEntity';
import { Entity, Column } from 'typeorm';
import { RefreshToken } from './RefreshToken';

export enum UserType {
    // Tipo: A-Administrador, G-Gerente, D-Dentista, P-Paciente, R-Responsável, V-Visitante
    ADMIN = 'A',
    MANAGER = 'G',
    DENTIST = 'D',
    PATIENT = 'P',
    RESPONSABLE = 'R',
    GUEST = 'V',
}

@Entity({ name: 'User' })
export class User extends BaseEntity {
    @Column({
        name: 'user_sg_user',
        type: 'varchar',
        length: 20,
        comment: 'Codname',
    })
    userSgUser: string;

    @Column({
        name: 'user_nm_name',
        type: 'varchar',
        length: 25,
        comment: 'Name',
    })
    userNmName: string;

    @Column({
        name: 'user_nm_lastname',
        type: 'varchar',
        length: 50,
        comment: 'Lastname',
        nullable: true,
    })
    userNmLastname: string;

    @Column({
        name: 'user_dt_birthdate',
        type: 'date',
        comment: 'Birth Date',
        nullable: true,
    })
    userDtBirthdate: Date;

    @Column({
        name: 'user_ds_email',
        type: 'varchar',
        length: 100,
        comment: 'Email',
    })
    userDsEmail: string;

    @Column({
        name: 'user_ds_phone',
        type: 'varchar',
        length: 20,
        comment: 'Phone',
        nullable: true,
    })
    userDsPhone: string;

    @Column({
        name: 'user_ds_smartphone',
        type: 'varchar',
        length: 20,
        comment: 'Smartphone',
        nullable: true,
    })
    userDsSmartphone: string;

    @Column({
        name: 'user_ds_whatsapp',
        type: 'varchar',
        length: 20,
        comment: 'Whatsapp',
        nullable: true,
    })
    userDsWhatsapp: string;

    @Column({
        name: 'user_cd_password',
        type: 'varchar',
        length: 50,
        comment: 'Password',
    })
    userCdPassword: string;

    @Column({
        name: 'user_cd_recovery',
        type: 'varchar',
        length: 50,
        comment: 'Password Recovery',
    })
    userCdRecovery: string;

    @Column({
        name: 'user_cd_type',
        type: 'enum',
        comment: 'Tipo: A-Administrador, G-Gerente, D-Dentista, P-Paciente, R-Responsável, V-Visitante',
        enum: UserType,
        default: UserType.GUEST,
    })
    userCdType: UserType;

    @Column({
        name: 'user_tx_avatar',
        type: 'varchar',
        length: 500,
        comment: 'Avatar',
        nullable: true,
        default: '/photo_default.jpg',
    })
    userTxAvatar: string;

    @Column({
        name: 'user_cd_refreshtoken',
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: 'Refreshtoken',
    })
    refreshToken: RefreshToken;
}
