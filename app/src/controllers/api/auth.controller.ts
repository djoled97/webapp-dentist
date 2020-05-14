import { Controller, Post, Body, Req } from "@nestjs/common";
import { KorisnikService } from "src/services/korisnik/korisnik.service";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { JwtDataKorisnikDto } from "src/dtos/korisnik/jwt.data.korisnik.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";
import { LoginKorisnikDto } from "src/dtos/korisnik/login.korisnik.dto";
import { LoginInfoKorisnikDto } from 'src/dtos/korisnik/login.info.korisnik.dto'

@Controller('auth')
export class AuthController {
    constructor(public korisnikService: KorisnikService) { }

    @Post('login')
    async  doLogin(@Body() data: LoginKorisnikDto,@Req() req:Request): Promise<ApiResponse|LoginInfoKorisnikDto> {
        const korisnik = await this.korisnikService.getByUsername(data.username);

        if (!korisnik) {
            return new Promise(resolve =>
                resolve(new ApiResponse('error', -3001))
            )
        }
        
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        if(korisnik.passwordHash!==passwordHashString){
            return new Promise(resolve=>resolve(new ApiResponse('error',-3002)));
        }
        const jwtData=new JwtDataKorisnikDto()
        jwtData.korisnikId=korisnik.korisnikId;
        jwtData.username=korisnik.username;

        let now=new Date();
        now.setDate(now.getDate() + 14);
        const expTimestamp=now.getTime()/1000;
        
        jwtData.expDate=expTimestamp;
        jwtData.ip=req.ip.toString();
        jwtData.userAgent=req.headers["user-agent"];
        
        let token:string=jwt.sign(jwtData.toPlainObject(),jwtSecret)
        const responseObject=new LoginInfoKorisnikDto(
            korisnik.korisnikId,
            korisnik.username,
            token
            )
       
       
            return new Promise(resolve=>resolve(responseObject))
        }

    }

