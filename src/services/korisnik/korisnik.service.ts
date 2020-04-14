import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Korisnik } from 'entities/korisnik.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KorisnikService {
    constructor(
        @InjectRepository(Korisnik) private readonly korisnik: Repository<Korisnik>
    ) { }


    getAll(): Promise<Korisnik[]> {
        return this.korisnik.find();
    }
    getById(id: number):Promise<Korisnik> {
        return this.korisnik.findOne(id);
    }
}
