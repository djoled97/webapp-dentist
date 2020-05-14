import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Cena } from "entities/cena.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Usluga } from "entities/usluga.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { AddUslugaDto } from "src/dtos/usluga/add.usluga.dto";


@Injectable()
export class UslugaService extends TypeOrmCrudService<Usluga>{

    constructor(@InjectRepository(Usluga) private readonly usluga: Repository<Usluga>,
    @InjectRepository(Cena) private readonly cena:Repository<Cena>
    ) { super(usluga); }


    async createFullUsluga(data:AddUslugaDto):Promise<Usluga|ApiResponse>{
        let newUsluga:Usluga=new Usluga();
        newUsluga.kataloskiBroj=data.kataloskiBroj;
        newUsluga.nazivUsluge=data.nazivUsluge;
        newUsluga.kategorija=data.kategorija;
        newUsluga.opis=data.opis;   

       let savedUsluga= await this.usluga.save(newUsluga);

       let newCena:Cena=new Cena();
       newCena.uslugaId=savedUsluga.uslugaId;
       newCena.cenaJedan=data.cena.cenaJedan;
       newCena.cenaPaket=data.cena.cenaPaket;
       newCena.cenaUzrast=data.cena.cenaUzrast;     

       this.cena.save(newCena);
     
    return await  this.usluga.findOne(savedUsluga.uslugaId,{
           relations:[
               "cena"
           ]
       })
    }
}