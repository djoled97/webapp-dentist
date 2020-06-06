import { Pregled } from "entities/pregled.entity";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddPregledDto } from "src/dtos/pregled/add.pregled.dto";
import e = require("express");


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



}