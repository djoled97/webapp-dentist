import { Controller, Get, Param } from '@nestjs/common';
import { Korisnik } from 'entities/korisnik.entity';
import { KorisnikService } from '../services/korisnik/korisnik.service';


@Controller()
export class AppController {
  constructor(
    private korisnikService:KorisnikService
  ){}
  
  @Get()
  getHello():string {
    return "helloooo"
  }
  
//   @Get('api/korisnik/:id')
//   getUser(@Param('id') id ):Promise<Korisnik>{
//   return   this.korisnikService.getById(id);
//   }
// @Get('s')
//   test():string{
//     return "test";
//   }
}
