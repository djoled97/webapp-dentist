import { Controller, Post, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";

import { KartonPacijentService } from "src/services/karton/karton-pacijent.service";
import { KartonPacijent } from "entities/karton-pacijent.entity";
import { PatientSearchDto } from "src/dtos/pacijent/patient.search.dto";

@Controller('api/karton')
@Crud({
    model:{
        type:KartonPacijent
    },
    params:{
        id:{
            field:'kartonPacijentId',
            type:'number',
            primary:true
            
        }
    
    },
    query:{
        join:{
          korisnik:{
              eager:true
          }
        }
    }
})
export class KartonPacijentController{

    // iskljucivo ime servisa service inace izbacuje runtime error
    constructor(public service:KartonPacijentService){
}
@Post('search')
async search(@Body() data:PatientSearchDto){
    return await this.service.search(data);
}

}