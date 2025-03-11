import Address from './Address';
import User from './User';

export default class Dentist {
    #uid: string;
    #dentNrCRO: string;
    #user: User;
    #address: Address;

    constructor(
        uid: string = null,
        dentNrCRO: string = null,
        user: User = null,
        address: Address = null
    ) {
        this.#dentNrCRO = dentNrCRO;
        this.#user = user;
        this.#address = address;
        this.#uid = uid;
    }

    static vazio() {
        return new Dentist();
    }

    // - SETs and GETs

    set uid(value) {
        this.#uid = value;
    }
    set dentNrCRO(value) {
        this.#dentNrCRO = value;
    }
    set user(value) {
        this.#user = value;
    }
    set address(value) {
        this.#address = value;
    }

    get uid() {
        return this.#uid;
    }
    get dentNrCRO() {
        return this.#dentNrCRO;
    }
    get user() {
        return this.#user;
    }
    get address() {
        return this.#address;
    }
}
