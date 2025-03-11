export default class Phone {
  static format(tel: string) {
    const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
    let result = "---";
    if (tel !== null) {
      var str = tel.replace(/[^0-9]/g, "").slice(0, 11);
      result = str.replace(regex, "($1) $2-$3");
    }
    return result;
  }
}
