export enum UserType {
    // A = 'Administrador',
    // G = 'Gestor',
    // V = 'Visitante',
    ADMINISTRADOR = 'A',
    GESTOR = 'G',
    VISITANTE = 'V',
}

export default class User {
    #uid: string;
    #userSgUser: string;
    #userNmName: string;
    #userNmLastname: string;
    #userDtBirthdate: Date;
    #userDsEmail: string;
    #userDsPhone: string;
    #userDsSmartphone: string;
    #userDsWhatsapp: string;
    #userCdPassword: string;
    #userCdRecovery: string;
    #userCdType: UserType;
    #userTxAvatar: string;
    #userCdRefreshtoken: string;

    constructor(
        userSgUser: string = null,
        userNmName: string = null,
        userNmLastname: string = null,
        userDtBirthdate: Date = null,
        userDsEmail: string = null,
        userDsPhone: string = null,
        userDsSmartphone: string = null,
        userDsWhatsapp: string = null,
        userCdPassword: string = null,
        userCdRecovery: string = null,
        userCdType: UserType = null,
        userTxAvatar: string = null,
        userCdRefreshtoken: string = null,
        uid: string = null
    ) {
        this.#userSgUser = userSgUser;
        this.#userNmName = userNmName;
        this.#userNmLastname = userNmLastname;
        this.#userDtBirthdate = userDtBirthdate;
        this.#userDsEmail = userDsEmail;
        this.#userDsPhone = userDsPhone;
        this.#userDsSmartphone = userDsSmartphone;
        this.#userDsWhatsapp = userDsWhatsapp;
        this.#userCdPassword = userCdPassword;
        this.#userCdRecovery = userCdRecovery;
        this.#userCdType = userCdType;
        this.#userTxAvatar = userTxAvatar;
        this.#userCdRefreshtoken = userCdRefreshtoken;
        this.#uid = uid;
    }

    static vazio() {
        return new User();
    }

    // - SETs and GETs

    set uid(value) {
        this.#uid = value;
    }
    set userNmName(value) {
        this.#userNmName = value;
    }
    set userSgUser(value) {
        this.#userSgUser = value;
    }
    set userNmLastname(value) {
        this.#userNmLastname = value;
    }
    set userDtBirthdate(value) {
        this.#userDtBirthdate = value;
    }
    set userDsEmail(value) {
        this.#userDsEmail = value;
    }
    set userDsPhone(value) {
        this.#userDsPhone = value;
    }
    set userDsSmartphone(value) {
        this.#userDsSmartphone = value;
    }
    set userDsWhatsapp(value) {
        this.#userDsWhatsapp = value;
    }
    set userCdPassword(value) {
        this.#userCdPassword = value;
    }
    set userCdRecovery(value) {
        this.#userCdRecovery = value;
    }
    set userCdType(value) {
        this.#userCdType = value;
    }
    set userTxAvatar(value) {
        this.#userTxAvatar = value;
    }
    set userCdRefreshtoken(value) {
        this.#userCdRefreshtoken = value;
    }

    get uid() {
        return this.#uid;
    }
    get userNmName() {
        return this.#userNmName;
    }
    get userSgUser() {
        return this.#userSgUser;
    }
    get userNmLastname() {
        return this.#userNmLastname;
    }
    get userDtBirthdate() {
        return this.#userDtBirthdate;
    }
    get userDsEmail() {
        return this.#userDsEmail;
    }
    get userDsPhone() {
        return this.#userDsPhone;
    }
    get userDsSmartphone() {
        return this.#userDsSmartphone;
    }
    get userDsWhatsapp() {
        return this.#userDsWhatsapp;
    }
    get userCdPassword() {
        return this.#userCdPassword;
    }
    get userCdRecovery() {
        return this.#userCdRecovery;
    }
    get userCdType() {
        return this.#userCdType;
    }
    get userTxAvatar() {
        return this.#userTxAvatar;
    }
    get userCdRefreshtoken() {
        return this.#userCdRefreshtoken;
    }
}
