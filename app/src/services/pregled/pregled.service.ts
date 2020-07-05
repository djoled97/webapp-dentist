import { Pregled } from "entities/pregled.entity";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddPregledDto } from "src/dtos/pregled/add.pregled.dto";
import e = require("express");
import { SearchPregledDto } from "src/dtos/pregled/search.pregled.dto";


@Injectable()
export class PregledService extends TypeOrmCrudService<Pregled>{
    constructor(@InjectRepository(Pregled) private readonly pregled: Repository<Pregled>
    ) { super(pregled); }

    async  addPregled(data: AddPregledDto): Promise<Pregled> {

        const newpregled: Pregled = new Pregled();



        newpregled.uslugaId = data.uslugaid;
        newpregled.kartonPacijentId = data.kartonPacijentId;
        if (!data.datum) {
            newpregled.datum = new Date();
        } else {
            newpregled.datum = data.datum;
        }

        await this.pregled.save(newpregled);

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
                'kartonPacijent.korisnik'
            ],
            order: {
                datum: "ASC"
            }
        });
    }
    async   searchPregledByDate(data:SearchPregledDto) {
        const builder = await this.pregled.createQueryBuilder("pregled");
        
        builder.where("pregled.datum >= :kw and pregled.datum  <= :kw2",{kw:data.dateStart ,kw2:data.dateEnd });


        const searchedPregled:Pregled[]= await builder.getMany();

        return this.pregled.findByIds(searchedPregled,{
            relations: [
                'kartonPacijent',
                'usluga',
                'kartonPacijent.korisnik'
            ],
            order: {
                datum: "ASC"
            }
        })

    }
}
