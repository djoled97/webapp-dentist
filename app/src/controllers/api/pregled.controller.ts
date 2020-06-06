import { Controller, Post, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Pregled } from "entities/pregled.entity";
import { PregledService } from "src/services/pregled/pregled.service";
import { AddPregledDto } from "src/dtos/pregled/add.pregled.dto";
import { Usluga } from "entities/usluga.entity";


@Controller('api/pregled')
@Crud({
    model: {
        type: Pregled
    },
    params: {
        id: {
            field: 'pregledId',
            type: 'number',
            primary: true

        }

    },
    query: {
        join: {
            usluga: {
                eager: true
                    
            }
          
            
            
            
        }
    }
})
export class PregledController {

    // iskljucivo ime servisa service inace izbacuje runtime error
    constructor(public service: PregledService) {
    }
    @Post()
    addPregled(@Body() data:AddPregledDto ){
        return this.service.addPregled(data);
    }


}