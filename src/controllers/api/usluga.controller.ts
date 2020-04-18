import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";

import { KartonPacijentService } from "src/services/karton/karton-pacijent.service";
import { KartonPacijent } from "entities/karton-pacijent.entity";
import { UslugaService } from "src/services/usluga/usluga.service";
import { Usluga } from "entities/usluga.entity";

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
            korisnik: {
                eager: false
            }
        }
    }
})
export class UslugaController {

    // iskljucivo ime servisa service inace izbacuje runtime error
    constructor(public service: UslugaService) {
    }
}