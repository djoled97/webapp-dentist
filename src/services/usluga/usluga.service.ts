import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Cena } from "entities/cena.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Usluga } from "entities/usluga.entity";
@Injectable()
export class UslugaService extends TypeOrmCrudService<Usluga>{

    constructor(@InjectRepository(Usluga) private readonly usluga: Repository<Usluga>
    ) { super(usluga); }

}