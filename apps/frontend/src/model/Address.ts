import { StateType } from '@/enums/state';

export default class Address {
    #uid: string;
    #addrNmAddress: string;
    #addrDsAddress: string;
    #addrDsComplement: string;
    #addrDsNumber: string;
    #addrDsDistrict: string;
    #addrDsCity: string;
    #addrSgState: StateType;
    #addrDsZipcode: string;
    #addrNmContact: string;
    #addrDsPhone: string;

    constructor(
        addrNmAddress: string = null,
        addrDsAddress: string = null,
        addrDsComplement: string = null,
        addrDsNumber: string = null,
        addrDsDistrict: string = null,
        addrDsCity: string = null,
        addrSgState: StateType = null,
        addrDsZipcode: string = null,
        addrNmContact: string = null,
        addrDsPhone: string = null,
        uid: string = null
    ) {
        this.#addrNmAddress = addrNmAddress;
        this.#addrDsAddress = addrDsAddress;
        this.#addrDsComplement = addrDsComplement;
        this.#addrDsNumber = addrDsNumber;
        this.#addrDsDistrict = addrDsDistrict;
        this.#addrDsCity = addrDsCity;
        this.#addrSgState = addrSgState;
        this.#addrDsZipcode = addrDsZipcode;
        this.#addrNmContact = addrNmContact;
        this.#addrDsPhone = addrDsPhone;
        this.#uid = uid;
    }

    static vazio() {
        return new Address();
    }

    // - SETs and GETs

    set uid(value) {
        this.#uid = value;
    }
    set addrNmAddress(value) {
        this.#addrNmAddress = value;
    }
    set addrDsAddress(value) {
        this.#addrDsAddress = value;
    }
    set addrDsComplement(value) {
        this.#addrDsComplement = value;
    }
    set addrDsNumber(value) {
        this.#addrDsNumber = value;
    }
    set addrDsDistrict(value) {
        this.#addrDsDistrict = value;
    }
    set addrDsCity(value) {
        this.#addrDsCity = value;
    }
    set addrSgState(value) {
        this.#addrSgState = value;
    }
    set addrDsZipcode(value) {
        this.#addrDsZipcode = value;
    }
    set addrNmContact(value) {
        this.#addrNmContact = value;
    }
    set addrDsPhone(value) {
        this.#addrDsPhone = value;
    }

    get uid() {
        return this.#uid;
    }
    get addrNmAddress() {
        return this.#addrNmAddress;
    }
    get addrDsAddress() {
        return this.#addrDsAddress;
    }
    get addrDsComplement() {
        return this.#addrDsComplement;
    }
    get addrDsNumber() {
        return this.#addrDsNumber;
    }
    get addrDsDistrict() {
        return this.#addrDsDistrict;
    }
    get addrDsCity() {
        return this.#addrDsCity;
    }
    get addrSgState() {
        return this.#addrSgState;
    }
    get addrDsZipcode() {
        return this.#addrDsZipcode;
    }
    get addrNmContact() {
        return this.#addrNmContact;
    }
    get addrDsPhone() {
        return this.#addrDsPhone;
    }
}
