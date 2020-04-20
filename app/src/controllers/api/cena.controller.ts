import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Cena } from "entities/cena.entity";
import { CenaService } from "src/services/cena/cena.service";

@Controller('api/cena')
@Crud({
    model:{
        type:Cena
    },
    params:{
        id:{
            field:'cenaId',
            type:'number',
            primary:true
            
        }
    
    },
    query:{
        join:{
          usluga:{
              eager:true
          }
        }
    }
})
export class CenaController{

    // iskljucivo ime servisa service inace izbacuje runtime error
    constructor(public service:CenaService){
}


}