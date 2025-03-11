'use client';
import Address from '@/model/Address';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { normalizePhoneNumber, normalizeSmartphoneNumber } from '@/mask/Mask';
import Image from 'next/image';
import { toast } from 'sonner';
import InputMask from 'react-input-mask';
import { StateType } from '@/enums/state';
import CrudHeader from '@/components/templates/CrudHeader';
import Botao from '@/components/templates/Botao';
import User from '@/model/User';

// formato internacional (coloquei apenas para testar se as configurações e a biblioteca funciona para configurar. Não estou usando dentro deste arquivo.)
// New Internacional Number Formater - NINF
const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});
// Para utilizar o formato codifique desta maneira:
// formatter.format(<valor>)

interface FormAddressDetailProps {
    user: User;
    btnCancel: () => void;
    btnSave: (address: Address) => void;
}

export const StateTypeSchema = z.enum([StateType.MG, ...Object.values(StateType)]);

const enumUF = Array.from(Object.values(StateType).filter((val) => isNaN(Number(val))));

const FormDataSchema = z.object({
    uid: z.string(),
    addrNmAddress: z.string().min(3, { message: 'Nome é obrigatório. Verifique!' }),
    addrDsAddress: z.string().min(5, { message: 'Descrição insuficiente. Verifique!' }),
    addrDsComplement: z.string().optional(),
    addrDsNumber: z.string().optional(),
    addrDsDistrict: z.string().optional(),
    addrDsCity: z.string().min(3, { message: 'Cidade é obrigatória. Verifique!' }),
    addrSgState: StateTypeSchema,
    addrDsZipcode: z.string().optional(),
    addrNmContact: z.string().min(3, { message: 'Nome do contato é obrigatório. Informe!' }),
    addrDsPhone: z.string().min(3, { message: 'Telefone é obrigatório. Informe!' }),
});

type createFormData = z.infer<typeof FormDataSchema>;

export default function FormAddressDetail(props: FormAddressDetailProps) {
    const title = props.user?.uid ? 'Alterar Endereço' : 'Inserir Endereço';
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

    function loadingData(data: Address) {
        data.uid && setValue('uid', data.uid);
        setValue('addrNmAddress', data.addrNmAddress);
        setValue('addrDsAddress', data.addrDsAddress || '');
        setValue('addrDsComplement', data.addrDsComplement || '');
        setValue('addrDsNumber', data.addrDsNumber || '');
        setValue('addrDsDistrict', data.addrDsDistrict || '');
        setValue('addrDsCity', data.addrDsCity || '');
        setValue('addrSgState', data.addrSgState);
        setValue('addrDsZipcode', data.addrDsZipcode || '');
        setValue('addrNmContact', data.addrNmContact || '');
        setValue('addrDsPhone', normalizePhoneNumber(data.addrDsPhone) || '');
    }

    function replacer(key: any, value: any) {
        if (value === null) {
            return undefined;
        }
        if (key === 'addrDsPhone' && value !== null) {
            const newValue = value.replace(/[^0-9]+/g, '');
            return newValue;
        }
        return value;
    }

    function transformData(data: any) {
        let objAddress = {};
        objAddress = {
            uid: data?.uid || null,
            addrNmAddress: data?.addrNmAddress || null,
            addrDsAddress: data?.addrDsAddress || null,
            addrDsComplement: data?.addrDsComplement || null,
            addrDsNumber: data?.addrDsNumber || null,
            addrDsDistrict: data?.addrDsDistrict || null,
            addrDsCity: data?.addrDsCity || null,
            addrSgState: data?.addrSgState || null,
            addrDsZipcode: data?.addrDsZipcode || null,
            addrNmContact: data?.addrNmContact || null,
            addrDsPhone: data?.addrDsPhone || null,
        };

        const transform = JSON.stringify(objAddress, replacer);
        return transform;
    }

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
                    <div className="col-span-12">
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
                                            {...register('addrNmAddress')}
                                        />
                                        {errors.addrNmAddress && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.addrNmAddress.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-4/5">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="description"
                                            className="text-lg font-semibold pl-3">
                                            Endereço
                                        </label>
                                        <input
                                            id="description"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('addrDsAddress')}
                                        />
                                        {errors.addrDsAddress && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.addrDsAddress.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Linha 3 ************************************************************ */}
                        <div className="flex flex-col mb-2">
                            <div className="flex flex-row flex-1 w-full gap-1">
                                <div className="w-4/12">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="complement"
                                            className="text-lg font-semibold pl-3">
                                            Complemento
                                        </label>
                                        <input
                                            id="complement"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('addrDsComplement')}
                                        />
                                        {errors.addrDsComplement && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.addrDsComplement.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/12">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="number"
                                            className="text-lg font-semibold pl-3">
                                            Número
                                        </label>
                                        <input
                                            id="number"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('addrDsNumber')}
                                        />
                                        {errors.addrDsNumber && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.addrDsNumber.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-2/12">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="district"
                                            className="text-lg font-semibold pl-3">
                                            Bairro
                                        </label>
                                        <input
                                            id="district"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('addrDsDistrict')}
                                        />
                                        {errors.addrDsDistrict && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.addrDsDistrict.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-2/12">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="city"
                                            className="text-lg font-semibold pl-3">
                                            Cidade
                                        </label>
                                        <input
                                            id="city"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('addrDsCity')}
                                        />
                                        {errors.addrDsCity && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.addrDsCity.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/12">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="state"
                                            className="text-lg font-semibold pl-3">
                                            UF
                                        </label>
                                        <select
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            name="state"
                                            id="state"
                                            {...register('addrSgState')}>
                                            {enumUF.map((uf) => (
                                                <option key={uf} value={uf}>
                                                    {uf}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.addrSgState && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.addrSgState.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-2/12">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="zipcode"
                                            className="text-lg font-semibold pl-3">
                                            CEP
                                        </label>
                                        <InputMask
                                            id="zipcode"
                                            type="text"
                                            mask="99999-999"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('addrDsZipcode')}
                                        />
                                        {errors.addrDsZipcode && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.addrDsZipcode.message}
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
                                            htmlFor="contact"
                                            className="text-lg font-semibold pl-3">
                                            Contato
                                        </label>
                                        <input
                                            id="contact"
                                            type="text"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('addrNmContact')}
                                        />
                                        {errors.addrNmContact && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.addrNmContact.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="phone"
                                            className="text-lg font-semibold pl-3">
                                            Telefone
                                        </label>
                                        <InputMask
                                            id="phone"
                                            type="text"
                                            mask="(99) 99999-9999"
                                            className={`focus:bg-white focus:border-cyan-400 focus:outline-none rounded-xl border-gray-300 border-2`}
                                            {...register('addrDsPhone')}
                                        />
                                        {errors.addrDsPhone && (
                                            <span className="text-red-500 pl-2 pt-1 text-sm">
                                                {errors.addrDsPhone.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Botões ************************************************************ */}
                        <div className="flex flex-row justify-end items-center mt-5">
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
