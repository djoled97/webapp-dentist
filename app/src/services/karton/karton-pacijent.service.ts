import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { KartonPacijent } from "entities/karton-pacijent.entity";
import { PatientSearchDto } from "src/dtos/pacijent/patient.search.dto";
import { Korisnik } from "entities/korisnik.entity";
import { Validate } from "class-validator";
import { ApiResponse } from "src/misc/api.response.class";
@Injectable()
export class KartonPacijentService extends TypeOrmCrudService<KartonPacijent>{

    constructor(@InjectRepository(KartonPacijent) private readonly karton: Repository<KartonPacijent>
    ) { super(karton); }




    async search(data: PatientSearchDto): Promise<KartonPacijent[] | ApiResponse> {
        const builder = await this.karton.createQueryBuilder("karton");




        if (data.keywords.trim().length > 0) {
            builder.where("karton.ime LIKE :kw OR karton.prezime LIKE :kw", { kw: "%" + data.keywords + "%" });
            builder.orWhere("CONCAT (karton.ime,' ',karton.prezime) LIKE :kw", { kw: "%" + data.keywords + "%" });
        }



        const users: KartonPacijent[] = await builder.getMany();

        const result = await this.karton.findByIds(users, {


            relations: [
                "pregleds",
                "pregleds.usluga"
            ]



        })
        //iz nekog razloga provera za null ne radi pa zato koristim length
        if (users.length != 0) {
            return result;
        } else {
            return new ApiResponse("error", -3001, "User not found");
        }

    }



}


