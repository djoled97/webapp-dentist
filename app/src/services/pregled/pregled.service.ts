import { Pregled } from "entities/pregled.entity";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddPregledDto } from "src/dtos/pregled/add.pregled.dto";
import e = require("express");
import { SearchPregledDto } from "src/dtos/pregled/search.pregled.dto";
import { ApiResponse } from "src/misc/api.response.class";


@Injectable()
export class PregledService extends TypeOrmCrudService<Pregled>{
    constructor(@InjectRepository(Pregled) private readonly pregled: Repository<Pregled>
    ) { super(pregled); }

    async  addPregled(data: AddPregledDto): Promise<Pregled> {

        let newpregled: Pregled ;

        for(let uslugaid of data.uslugaid){
            newpregled = new Pregled();
            newpregled.uslugaId = uslugaid;


            newpregled.kartonPacijentId = data.kartonPacijentId;
            if (!data.datum) {
                newpregled.datum = new Date();
            } else {
                newpregled.datum = data.datum;
            }
    
            await this.pregled.save(newpregled);
        }   

      
       

        return await this.pregled.findOne(newpregled.pregledId, {

            relations: [
                'kartonPacijent',
                'usluga'

            ]
        })




    }
    getAllPregleds(): Promise<Pregled[]> {

        return this.pregled.find({
            relations: [
                'kartonPacijent',
                'usluga',
                'usluga.cena',
                'kartonPacijent.korisnik'
            ],
            order: {
                datum: "ASC"
            }
        });
    }
    async   searchPregledByDate(data:SearchPregledDto):Promise<Pregled[]|ApiResponse> {
        const builder = await this.pregled.createQueryBuilder("pregled");
        
        builder.where("pregled.datum >= :kw and pregled.datum  <= :kw2",{kw:  data.dateStart  , kw2: data.dateEnd });


        const searchedPregleds:Pregled[]= await builder.getMany();
            
        // if(searchedPregled.length===0){
        //     return new Promise((resolve)=>{
        //         resolve(new ApiResponse("error",-10001))
        //     })
        // }
        return this.pregled.findByIds(searchedPregleds,{
            relations: [
                'kartonPacijent',
                'usluga',
                'usluga.cena',
                'kartonPacijent.korisnik'
            ],
            order: {
                datum: "ASC"
            }
        })

    }
}
