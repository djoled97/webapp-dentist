import { Injectable } from '@nestjs/common';
import { KorisnikService } from 'src/services/korisnik/korisnik.service';

@Injectable()
export class AuthService {
    constructor(private korisnikService: KorisnikService) {}

    // async validateUser(username: string, pass: string): Promise<any> {
    //   const user = await this.korisnikService.getUsername(username);
    //   if (user && user.password === pass) {
    //     const { password, ...result } = user;
    //     return result;
    //   }
    //   return null;
    // }
  }


