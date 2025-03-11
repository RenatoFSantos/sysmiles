import { FindManyOptions } from 'typeorm';
import { Address } from '../entity/Address';
import { BaseController } from './BaseController';
import { Request, Response, NextFunction } from 'express';

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

    async allAddress(request: Request, response: Response, next: NextFunction) {
        const params = request.query;
        const keys = Object.keys(params);
        const values = Object.values(params);
        // Sort
        const sort = params.sort;
        // Path
        const path = params.path;
        // Number of records per page
        const limit: number = params.limit || 10;
        // Page number
        const page = params.page || 1;
        // Previous records number
        const numRec = page === 1 ? 1 : page * limit - limit;
        // Number of records
        const totalRec = await Number(this.allActives);
        // const totalRec = await this._repository.count();
        // Last page
        const lastPage = Math.ceil(totalRec / limit);

        let result: Address[];
        let search = '';
        if (keys.length > 3) {
            search = `%${params?.addr_nm_address}%`;
            result = await this.repository
                .createQueryBuilder('table')
                .where('table.deleted = false')
                .andWhere(`table.addr_nm_address ILIKE :search`, { search })
                .orderBy(`table.${sort}`)
                .getMany();
        } else {
            result = await this.repository
                .createQueryBuilder('table')
                .where('table.deleted = false')
                .orderBy(`table.${sort}`)
                .take(limit)
                .skip(numRec)
                .getMany();
        }
        return response.json({
            result,
            pagination: {
                // Path
                path: path,
                // Current Page
                page: +page,
                // Total per page
                recpage: +limit,
                // Previous page
                prev_page_url: +page - 1 >= 1 ? page - 1 : false,
                // Next page
                next_page_url: +page + 1 > lastPage ? false : +page + 1,
                // Last Page
                lastPage,
                // Number of records
                total: keys.length > 3 ? result.length : totalRec,
            },
        });
    }
}
