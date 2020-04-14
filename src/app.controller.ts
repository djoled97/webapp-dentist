import { Controller, Get } from '@nestjs/common';
import { Korisnik } from 'entities/korisnik.entity';
import { KorisnikService } from './services/korisnik/korisnik.service';


@Controller()
export class AppController {
  constructor(
    private korisnikService:KorisnikService
  ){}
  
  @Get()
  getHello(): Promise<Korisnik[]> {
    return   this.korisnikService.getAll()
  }
  @Get('api/korisnik')
  getAllUsers():Promise<Korisnik[]>{
  return   this.korisnikService.getAll()
  }
@Get('s')
  test():string{
    return "test";
  }
}
