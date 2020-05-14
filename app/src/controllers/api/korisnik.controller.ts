import { Controller, Get, Param, Put, Body, Post, Delete } from "@nestjs/common";
import { KorisnikService } from "src/services/korisnik/korisnik.service";
import { Korisnik } from "entities/korisnik.entity";
import { AddKorisnikDto } from "src/dtos/korisnik/add.korisnik.dto";
import { editKorsinikDto } from "src/dtos/korisnik/edit.korisnik.dto";
import { ApiResponse } from "src/misc/api.response.class";
const rateLimit=require("express-rate-limit");
@Controller('api/korisnik')
export class KorisnikController {

    constructor(private korisnikService: KorisnikService) { }


    @Get()
    getAllUsers(): Promise<Korisnik[]> {
        return this.korisnikService.getAll()
    }
    @Get(':id')
    getById(@Param('id') id: number): Promise<Korisnik | ApiResponse> {
        

        return new Promise(async (resolve) => {
            let korisnik = await this.korisnikService.getById(id);
            if(korisnik===undefined){
                resolve(new ApiResponse("error", 3001))
            }
            resolve(korisnik)
        })


    }


    @Put()
    addUser(@Body() data: AddKorisnikDto): Promise<Korisnik | ApiResponse> {
        return this.korisnikService.add(data);
    }
    @Post(':id')
    editUser(@Param('id') id: number, @Body() data: editKorsinikDto): Promise<Korisnik | ApiResponse> {

        return this.korisnikService.editById(id, data);
    }
   
   
    // @Delete(':id')
    // deleteUser(@Param('id') id:number){
    //     return this.korisnikService.delete(id);
    // }



}