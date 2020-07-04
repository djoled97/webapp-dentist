import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Cena } from "entities/cena.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Usluga } from "entities/usluga.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { AddUslugaDto } from "src/dtos/usluga/add.usluga.dto";
import { Kategorija } from "entities/kategorija.entity";
import { UslugaSerachDto } from "src/dtos/usluga/usluga.search.dto";


@Injectable()
export class UslugaService extends TypeOrmCrudService<Usluga>{

    constructor(@InjectRepository(Usluga) private readonly usluga: Repository<Usluga>,
        @InjectRepository(Cena) private readonly cena: Repository<Cena>,
        @InjectRepository(Kategorija) private readonly kategorija: Repository<Kategorija>
    ) { super(usluga); }


    async createFullUsluga(data: AddUslugaDto): Promise<Usluga | ApiResponse> {
        

        
        
        let newUsluga: Usluga = new Usluga();
        newUsluga.kataloskiBroj = data.kataloskiBroj;
        newUsluga.nazivUsluge = data.nazivUsluge;
        newUsluga.opis = data.opis;
        newUsluga.kategorijaId =data.kategorijaId;
        let savedUsluga = await this.usluga.save(newUsluga);

        let newCena: Cena = new Cena();
        newCena.uslugaId = savedUsluga.uslugaId;
        newCena.cenaJedan = data.cena.cenaJedan;
        newCena.cenaPaket = data.cena.cenaPaket;
        newCena.cenaUzrast = data.cena.cenaUzrast;

        let savedCena = await this.cena.save(newCena);



        return await this.usluga.findOne(savedUsluga.uslugaId, {
            relations: [
                'cena',
                'kategorija'
                
                
            ]

        })
    }
  async  searchUsluga(data:UslugaSerachDto){

        const builder = await this.usluga.createQueryBuilder("usluga").innerJoin("usluga.kategorija","kategorija");




        if (data.keywords.trim().length > 0) {
            builder.where("usluga.kataloski_broj LIKE :kw OR usluga.naziv_usluge LIKE :kw OR kategorija.ime LIKE :kw", { kw: "%" + data.keywords + "%" });
            
        }



        const services: Usluga[] = await builder.getMany();

        const result = await this.usluga.findByIds(services, {


            relations: [
                "kategorija",
                "cena"
            ]



        })
        //iz nekog razloga provera za null ne radi pa zato koristim length
        if (services.length != 0) {
            return result;
        } else {
            return new ApiResponse("error", -3001, "Service not found");
        }

    }

}