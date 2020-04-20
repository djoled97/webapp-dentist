import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { KartonPacijent } from "entities/karton-pacijent.entity";
@Injectable()
export class KartonPacijentService extends TypeOrmCrudService<KartonPacijent>{

    constructor(@InjectRepository(KartonPacijent) private readonly karton: Repository<KartonPacijent>
    ) { super(karton); }

}