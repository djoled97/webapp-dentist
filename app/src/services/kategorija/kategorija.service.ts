import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Cena } from "entities/cena.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Kategorija } from "entities/kategorija.entity";

@Injectable()
export class KategorijaService extends TypeOrmCrudService<Kategorija>{
    constructor(@InjectRepository(Kategorija) private readonly kategorija: Repository<Kategorija>
    ) { super(kategorija); }

    getName(): Promise <Kategorija[]> {
        return this.kategorija.find({
            select:["kategorijaId", "ime"]
        })
    }
}