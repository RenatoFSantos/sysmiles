export default class Category {
    #uid: string;
    #cateNmCategory: string;

    constructor(cateNmCategory: string = null, uid: string = null) {
        this.#cateNmCategory = cateNmCategory;
        this.#uid = uid;
    }

    static vazio() {
        return new Category();
    }

    // - SETs and GETs

    set uid(value) {
        this.#uid = value;
    }
    set cateNmCategory(value) {
        this.#cateNmCategory = value;
    }

    get uid() {
        return this.#uid;
    }
    get cateNmCategory() {
        return this.#cateNmCategory;
    }
}
