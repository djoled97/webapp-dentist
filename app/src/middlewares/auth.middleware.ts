import { NestMiddleware, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { KorisnikService } from "src/services/korisnik/korisnik.service";
import * as jwt from 'jsonwebtoken';
import { JwtDataKorisnikDto } from "src/dtos/korisnik/jwt.data.korisnik.dto";
import { jwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly korisnikService: KorisnikService) { }
    
    async use(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }

        const token = req.headers.authorization;

        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const tokenString = tokenParts[1];

        const jwtData: JwtDataKorisnikDto = jwt.verify(tokenString, jwtSecret);
        if (!jwtData) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.ip !== req.ip.toString()) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.userAgent !== req.headers["user-agent"]) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const korisnik = await this.korisnikService.getById(jwtData.korisnikId);
        if (!korisnik) {
            throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
        }
        
        
        const currentTimeStamp = new Date().getTime() / 1000;

        if (currentTimeStamp >= jwtData.expDate) {
            throw new HttpException('The token has expired', HttpStatus.UNAUTHORIZED);
        }

        next();
    }
}