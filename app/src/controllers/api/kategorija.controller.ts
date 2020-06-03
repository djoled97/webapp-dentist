import { Controller, Post, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Kategorija } from "entities/kategorija.entity";
import { KategorijaService } from "src/services/kategorija/kategorija.service";

@Controller('api/kategorija')
@Crud({
    model: {
        type:Kategorija
    },
    params: {
        id: {
            field: 'kategorijaId',
            type: 'number',
            primary: true

        }

    },


})
export class KategorijaController {

    // iskljucivo ime servisa service inace izbacuje runtime error
    constructor(public service: KategorijaService) {
    }



}