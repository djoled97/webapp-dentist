import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Korisnik } from 'entities/korisnik.entity';
import { Repository, Connection, getConnection, getRepository } from 'typeorm';
import { AddKorisnikDto } from 'src/dtos/korisnik/add.korisnik.dto';
import { editKorsinikDto } from 'src/dtos/korisnik/edit.korisnik.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import * as crypto from 'crypto';


@Injectable()
export class KorisnikService {
    constructor(
        @InjectRepository(Korisnik) private readonly korisnik: Repository<Korisnik>
    ) { }
        findOne(user:string){
            
            // return this.korisnik
            
        }

    getAll(): Promise<Korisnik[]> {

        return this.korisnik.find();
    }

    getById(id: number): Promise<Korisnik> {
        
        return  this.korisnik.findOne(id); // Ovde si stavio da se trazi po argumentu username:string, a treba po id:number !

         // let newKorisnik=await getRepository(Korisnik).createQueryBuilder("korisnik")
        // .where("username=" + id).getOne()
        // return new Promise( (resolve)=>{
        //     resolve(newKorisnik);
        // })
    }

    async getByUsername (usernameString: string): Promise <Korisnik | null> {
        const korisnik = await this.korisnik.findOne({
            username: usernameString
        });

        if (korisnik) {
            return korisnik
        }

        return null;
    }

    add(data: AddKorisnikDto): Promise<Korisnik|ApiResponse> {

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.passwordHash);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let korisnik: Korisnik = new Korisnik();
        korisnik.ime = data.ime;
        korisnik.prezime = data.prezime;
        korisnik.email = data.email;
        korisnik.username = data.username;
        korisnik.passwordHash = passwordHashString;
        korisnik.isAdmin=data.isAdmin;
       return new Promise((resolve)=>{
        this.korisnik.save(korisnik)
        .then(data => resolve(data))
        .catch(error =>{
            const response:ApiResponse=new ApiResponse("error",-1001);
            resolve(response);
        } )
       })
        


    }
    async editById(id: number, data: editKorsinikDto): Promise<Korisnik| ApiResponse > {
        let korisnik: Korisnik = await this.korisnik.findOne(id);
        if(korisnik===undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1002));
            })
        }
        const crypto = require('crypto');
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.passwordHash);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        korisnik.passwordHash = passwordHashString;
        korisnik.email = data.email;
        
        return this.korisnik.save(korisnik);
    }

    delete(id:number){
    
        return this.korisnik.delete(id);
    }


}
