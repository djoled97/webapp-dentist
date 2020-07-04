import { Controller, Post, Body, Get, Put, Param } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";

import { KartonPacijentService } from "src/services/karton/karton-pacijent.service";
import { KartonPacijent } from "entities/karton-pacijent.entity";
import { PatientSearchDto } from "src/dtos/pacijent/patient.search.dto";
import { editKorsinikDto } from "src/dtos/korisnik/edit.korisnik.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { PatientEditDto } from "src/dtos/pacijent/patient.edit.dto";

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
async search(@Body() data:PatientSearchDto):Promise<KartonPacijent[]|ApiResponse>{
    return await this.service.search(data);
}
@Get()
getPatients():Promise<KartonPacijent[]|ApiResponse>{
    return  this.service.getPatients();
}
@Put(':id')
editPatient(@Param('id') id :number, @Body() data:PatientEditDto) :Promise<KartonPacijent>{
    return this.service.editPatient(id,data);
}



}