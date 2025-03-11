'use client';

import User from '@/model/User';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { normalizePhoneNumber, normalizeSmartphoneNumber } from '../../mask/Mask';
import Image from 'next/image';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { toast } from 'sonner';
import { storage } from '@/firebase/config';
import { iconTrash } from '../icons';
import Botao from './Botao';
import InputMask from 'react-input-mask';
import CrudHeader from './CrudHeader';

// formato internacional (coloquei apenas para testar se as configurações e a biblioteca funciona para configurar. Não estou usando dentro deste arquivo.)
// New Internacional Number Formater - NINF
const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});
// Para utilizar o formato codifique desta maneira:
// formatter.format(<valor>)

interface FormUserDetailProps {
    user: User;
    btnCancel: () => void;
    btnSave: (user: User) => void;
}

export const USERTYPE = {
    ADMINISTRADOR: 'A',
    GESTOR: 'G',
    DENTISTA: 'D',
    VISITANTE: 'V',
} as const;

export const UserTypeSchema = z.enum([USERTYPE.ADMINISTRADOR, ...Object.values(USERTYPE)]);

const FormDataSchema = z
    .object({
        uid: z.string(),
        userNmName: z.string().min(3, { message: 'Nome é obrigatório. Verifique!' }),
        userSgUser: z.string().min(3, { message: 'Sigla inválida!' }).optional(),
        userNmLastname: z.string(),
        userDtBirthdate: z.coerce
            .date()
            .min(new Date('1900-01-01'), { message: 'Tem certeza?' })
            .max(new Date(), { message: 'Data inválida!' })
            .refine((data) => data < new Date(), { message: 'Data inválida!' })
            .transform((value) => value.toLocaleDateString('pt-BR', { timeZone: 'UTC' })),
        userDsEmail: z
            .string()
            .email({ message: 'Email inválido!' })
            .transform((value) => value.toLowerCase()),
        userDsPhone: z.string().optional(),
        userDsSmartphone: z.string().optional(),
        userDsWhatsapp: z.string().optional(),
        userCdPassword: z.string().min(3, { message: 'Senha inválida. Mínimo 3 caracteres' }),
        userCdConfirmPassword: z.string(),
        userCdRecovery: z.string().optional(),
        userCdType: UserTypeSchema,
        userTxAvatar: z.string().optional().nullable(),
        userCdRefreshtoken: z.string().optional(),
    })
    .refine(
        ({ userCdPassword, userCdConfirmPassword }) => userCdPassword === userCdConfirmPassword,
        { message: 'Senhas diferentes!', path: ['userCdConfirmPassword'] }
    );

type createFormData = z.infer<typeof FormDataSchema>;

export default function FormUserDetail(props: FormUserDetailProps) {
    const title = props.user?.uid ? 'Alterar Usuário' : 'Inserir Usuário';
    const [imageURL, setImageURL] = useState(null);
    const [preview, setPreview] = useState<string | null>('/photo_default.jpg');
    const [progress, setProgress] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<createFormData>({
        resolver: zodResolver(FormDataSchema),
    });

    useEffect(() => {
        loadingData(props.user);
    }, []);

    function loadingData(data: User) {
        data.uid && setValue('uid', data.uid);
        setValue('userNmName', data.userNmName);
        setValue('userNmLastname', data.userNmLastname || '');
        setValue('userDtBirthdate', (data.userDtBirthdate as any) || ('2020-04-22' as any));
        setValue('userDsEmail', data.userDsEmail || '');
        setValue('userDsPhone', normalizePhoneNumber(data.userDsPhone) || '');
        setValue('userDsSmartphone', normalizeSmartphoneNumber(data.userDsSmartphone) || '');
        setValue('userDsWhatsapp', normalizeSmartphoneNumber(data.userDsWhatsapp) || '');
        setValue('userTxAvatar', data.userTxAvatar || '/photo_default.jpg');
        setValue('userCdType', data.userCdType);
        // Get the image save that could change before to save.
        setPreview(data.userTxAvatar || '/photo_default.jpg');
        // Get last image saved.
        setImageURL(data.userTxAvatar || '/photo_default.jpg');
    }

    function replacer(key: any, value: any) {
        if (value === null) {
            return undefined;
        }
        if (
            (key === 'userDsWhatsapp' || key === 'userDsSmartphone' || key === 'userDsPhone') &&
            value !== null
        ) {
            const newValue = value.replace(/[^0-9]+/g, '');
            return newValue;
        }
        return value;
    }

    function transformData(data: any) {
        let objUser = {};
        const nickName = data.userNmName.substring(0, 3);
        objUser = {
            uid: data?.uid || null,
            userNmName: data?.userNmName,
            userNmLastname: data?.userNmLastname || null,
            userDtBirthdate: data?.userDtBirthdate || null,
            userDsEmail: data?.userDsEmail,
            userDsPhone: data?.userDsPhone || null,
            userDsSmartphone: data?.userDsSmartphone || null,
            userDsWhatsapp: data?.userDsWhatsapp || null,
            userCdType: data?.userCdType,
            userSgUser: nickName,
            userCdPassword: data?.userCdPassword,
            userCdRecovery: data?.userCdPassword,
            userTxAvatar: data?.userTxAvatar || null,
        };

        const transform = JSON.stringify(objUser, replacer);
        return transform;
    }

    // Upload image
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (imageURL.indexOf('https') >= 0) {
            // --- Delete before image
            deleteBeforeImage();
            setImageURL(null);
        }

        const file = event.target.files?.[0];

        if (file) {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    toast.error(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setPreview(url);
                        setValue('userTxAvatar', url);
                        setProgress(0);
                    });
                }
            );
        } else {
            setPreview(null);
        }
    };

    const deleteBeforeImage = async () => {
        const fileRef = ref(storage, imageURL);
        await deleteObject(fileRef);
    };

    const removeImage = () => {
        setPreview('/photo_default.jpg');
        setValue('userTxAvatar', '/photo_default.jpg');
    };

    function Save(model: any) {
        props.btnSave(model);
    }

    const submitting = (data: any) => {
        const model = transformData(data);
        Save(model);
    };

    return (
        <>
            <CrudHeader title={title} />
            <form className="bg-gray-200 mb-5 p-5 h-full" onSubmit={handleSubmit(submitting)}>
                <div className="grid grid-cols-12 gap-2 w-full bg-gray-200">
                    <div className="col-span-2 mt-3">
                        <div className="flex flex-col items-center align-middle flex-wrap">
                            <div className="relative w-[150px] h-[150px]">
                                {progress == 0 ? (
                                    <>
                                        <div
                                            className={`text-red-500 m-0 w-6 h-6 z-10`}
                                            onClick={() => removeImage()}>
                                            {iconTrash(3)}
                                        </div>
                                        <div>
                                            <Image
                                                // style={{ maxWidth: '100%', height: 'auto' }}
                                                src={preview}
                                                fill
                                                // width={200}
                                                // height={200}
                                                className="object-cover rounded-full"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                                                quality={80}
                                                alt="Avatar"
                                                {...register('userTxAvatar')}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-center w-[150px] h-[150px] items-center rounded-full bg-white">
                                        <span className="text-red-600">Carregando...</span>
                                    </div>
                                )}
                            </div>
                            {progress > 0 && (
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300 mt-2">
                                    <div
                                        className={`bg-blue-600 h-2.5 rounded-full`}
                                        style={{ width: `${progress}%` }}></div>
                                </div>
                            )}
                            <label
                                htmlFor="avatar"
                                className={`flex flex-row justify-center bg-white border-2 cursor-pointer border-cyan-800 text-cyan-800 hover:bg-cyan-800 hover:text-cyan-100 py-1 rounded-md px-2 mt-2 h-[40px] items-center`}>
                                Alterar
                            </label>
                            <input
                                id="avatar"
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2 bg-gray-100`}
                            />
                        </div>
                    </div>
                    <div className="col-span-10">
                        {/* Linha 1 ************************************************************ */}
                        <div className="flex flex-col mb-2">
                            <div className="flex flex-row flex-1 w-full flex-wrap">
                                <div className="w-1/2">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="id"
                                            className="text-lg font-semibold pt-1 pl-3">
                                            ID
                                        </label>
                                        <input
                                            id="id"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2 bg-gray-100`}
                                            {...register('uid')}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="w-4/5"></div>
                            </div>
                        </div>
                        {/* Linha 2 ************************************************************ */}
                        <div className="flex flex-col mb-2">
                            <div className="flex flex-row flex-1 w-full gap-1">
                                <div className="w-1/5">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="name"
                                            className="text-lg font-semibold pl-3">
                                            Nome
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('userNmName')}
                                        />
                                        {errors.userNmName && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.userNmName.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-2/5">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="lastname"
                                            className="text-lg font-semibold pl-3">
                                            Sobrenome
                                        </label>
                                        <input
                                            id="lastname"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('userNmLastname')}
                                        />
                                        {errors.userNmLastname && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.userNmLastname.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/5">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="birthdate"
                                            className="text-lg font-semibold pl-3">
                                            Nascimento
                                        </label>
                                        <input
                                            id="birthdate"
                                            type="date"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('userDtBirthdate')}
                                        />
                                        {errors.userDtBirthdate && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.userDtBirthdate.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/5">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="profile"
                                            className="text-lg font-semibold pl-3">
                                            Perfil
                                        </label>
                                        <select
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            name="Perfil"
                                            id="profile"
                                            {...register('userCdType')}>
                                            <option value="A">Administrador</option>
                                            <option value="G">Gestor</option>
                                            <option value="D">Dentista</option>
                                            <option value="V">Visitante</option>
                                        </select>
                                        {errors.userCdType && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.userCdType.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Linha 3 ************************************************************ */}
                        <div className="flex flex-col mb-2">
                            <div className="flex flex-row flex-1 w-full gap-1">
                                <div className="w-2/5">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="email"
                                            className="text-lg font-semibold pl-3">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('userDsEmail')}
                                        />
                                        {errors.userDsEmail && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.userDsEmail.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/5">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="phone"
                                            className="text-lg font-semibold pl-3">
                                            Telefone
                                        </label>
                                        <InputMask
                                            id="phone"
                                            type="text"
                                            mask="(99) 9999-9999"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('userDsPhone')}
                                        />
                                        {errors.userDsPhone && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.userDsPhone.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/5">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="smartphone"
                                            className="text-lg font-semibold pl-3">
                                            Celular
                                        </label>
                                        <InputMask
                                            id="smartphone"
                                            type="text"
                                            mask="(99) 99999-9999"
                                            onChange={(e) => {
                                                const { value } = e.target;
                                                e.target.value = normalizeSmartphoneNumber(value);
                                            }}
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('userDsSmartphone')}
                                        />
                                        {errors.userDsSmartphone && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.userDsSmartphone.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/5">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="whatsapp"
                                            className="text-lg font-semibold pl-3">
                                            Whatsapp
                                        </label>
                                        <InputMask
                                            id="whatsapp"
                                            type="text"
                                            mask="(99) 99999-9999"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('userDsWhatsapp')}
                                        />
                                        {errors.userDsWhatsapp && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.userDsWhatsapp.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Linha 4 ************************************************************ */}
                        {/* {data.uid} */}
                        <div className="flex flex-col mb-2">
                            <div className="flex flex-row flex-1 w-full gap-1">
                                <div className="w-1/2">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="password"
                                            className="text-lg font-semibold pl-3">
                                            Senha
                                        </label>
                                        <input
                                            id="password"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('userCdPassword')}
                                        />
                                        {errors.userCdPassword && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.userCdPassword.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="confirm"
                                            className="text-lg font-semibold pl-3">
                                            Confirma Senha
                                        </label>
                                        <input
                                            id="confirm"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('userCdConfirmPassword')}
                                        />
                                        {errors.userCdConfirmPassword && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.userCdConfirmPassword.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Botões ************************************************************ */}
                        <div className="flex flex-row justify-end items-center mt-5">
                            {/* <button
                                className={`bg-white border-2 cursor-pointer border-cyan-800 text-cyan-800 hover:bg-cyan-800 hover:text-cyan-100 px-4 py-2 rounded-md mr-5 h-1/2 items-center`}
                                type="submit">
                                Submit
                            </button> */}
                            <Botao className={`mr-5 h-1/2 items-center`} cor="cyan" type="form">
                                {props.user.uid !== '' ? 'Salvar' : 'Inserir'}
                            </Botao>
                            <Botao
                                className={`h-1/2`}
                                cor="cyan"
                                type="button"
                                onClick={props.btnCancel}>
                                Cancelar
                            </Botao>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
