import { Controller, Post, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";

import { KartonPacijentService } from "src/services/karton/karton-pacijent.service";
import { KartonPacijent } from "entities/karton-pacijent.entity";
import { UslugaService } from "src/services/usluga/usluga.service";
import { Usluga } from "entities/usluga.entity";
import { AddUslugaDto } from "src/dtos/usluga/add.usluga.dto";
import { UslugaSerachDto } from "src/dtos/usluga/usluga.search.dto";

@Controller('api/usluga')
@Crud({
    model: {
        type: Usluga
    },
    params: {
        id: {
            field: 'uslugaId',
            type: 'number',
            primary: true

        }

    },
    query: {
        join: {
            cena: {
                eager: true
            },
            kategorija: {
                eager: true
            }
        }
    }
})
export class UslugaController {

    // iskljucivo ime servisa service inace izbacuje runtime error
    constructor(public service: UslugaService) {
    }

    @Post('createUsluga')
    createFullUsluga(@Body() data: AddUslugaDto) {
        return this.service.createFullUsluga(data);
    }
    @Post('search')
    searchUsluga(@Body() data: UslugaSerachDto) {
        return this.service.searchUsluga(data);
    }

}