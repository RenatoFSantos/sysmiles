import { Address } from '../entity/Address';
import { BaseController } from './BaseController';
import { Request } from 'express';

export class AddressController extends BaseController<Address> {
    constructor() {
        super(Address, false);
    }

    async save(request: Request) {
        let _address = <Address>request.body();
        super.isRequired(_address.addrNmAddress, 'Identificação do endereço é necessária!');
        super.isRequired(_address.addrDsAddress, 'Descrição do endereço é necessária!');
        super.isRequired(_address.addrNmCity, 'Informe o nome da cidade!');
        super.isRequired(_address.addrSgState, 'Informe a UF da cidade!');
        super.isRequired(_address.addrNrZipcode, 'Informe o CEP da cidade!');
        return super.save(_address, request);
    }
}
