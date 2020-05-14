import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Cena } from "entities/cena.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CenaService extends TypeOrmCrudService<Cena>{
    constructor(@InjectRepository(Cena) private readonly cena: Repository<Cena>
    ) { super(cena); }
}