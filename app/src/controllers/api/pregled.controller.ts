import { Controller, Post, Body, Get } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Pregled } from "entities/pregled.entity";
import { PregledService } from "src/services/pregled/pregled.service";
import { AddPregledDto } from "src/dtos/pregled/add.pregled.dto";
import { Usluga } from "entities/usluga.entity";
import { SearchPregledDto } from "src/dtos/pregled/search.pregled.dto";
import { ApiResponse } from "src/misc/api.response.class";


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
                    
            },
            kartonPacijent:{
                
                eager:true
            },


          
            
            
            
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
@Get()
getPregleds():Promise<Pregled[]>{
    return this.service.getAllPregleds();
}
@Post('search')
searchPregledByDate(@Body() data:SearchPregledDto):Promise<Pregled[]|ApiResponse>{
    return this.service.searchPregledByDate(data);
}
}