export const normalizePhoneNumber = (value: String | undefined) => {
    if (!value) return '';

    return value
        .replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)/, '$1');
};

export const normalizeSmartphoneNumber = (value: String | undefined) => {
    if (!value) return '';

    return value
        .replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)/, '$1');
};

export const normalizeCnpjNumber = (value: String | undefined) => {
    if (!value) return '';

    return value
        .replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

export const formatCpfCnpj = (value: string | undefined) => {
    const cleanedValue = value.replace(/\D/g, ''); // remove caracteres não numéricos

    if (cleanedValue.length <= 11) {
        // CPF
        return cleanedValue
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    } else {
        // CNPJ
        return cleanedValue
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    }
};

export const normalizeCepNumber = (value: String | undefined) => {
    if (!value) return '';
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
        .replace(/(-\d{3})(\d+?)/, '$1');
};
