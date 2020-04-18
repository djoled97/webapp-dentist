import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";

import { KartonPacijentService } from "src/services/karton/karton-pacijent.service";
import { KartonPacijent } from "entities/karton-pacijent.entity";

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
              eager:false
          }
        }
    }
})
export class KartonPacijentController{

    // iskljucivo ime servisa service inace izbacuje runtime error
    constructor(public service:KartonPacijentService){
}


}