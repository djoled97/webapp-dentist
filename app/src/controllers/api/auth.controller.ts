import { Controller, Post, Body, Req, Put, HttpStatus, HttpException, UseGuards } from "@nestjs/common";
import { KorisnikService } from "src/services/korisnik/korisnik.service";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";
import { LoginKorisnikDto } from "src/dtos/korisnik/login.korisnik.dto";
import { LoginInfoKorisnikDto } from 'src/dtos/korisnik/login.info.korisnik.dto'
import { AddKorisnikDto } from "src/dtos/korisnik/add.korisnik.dto";
import { Korisnik } from "entities/korisnik.entity";
import { JwtRefreshDataDto } from "src/dtos/auth/jwt.refresh.dto";
import { RefreshTokenMethods } from "src/misc/refresh.token.methods"
import { KorisnikRefreshTokenDto } from "src/dtos/auth/korisnik.refresh.token";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";

@Controller('auth')
export class AuthController {
    constructor(public korisnikService: KorisnikService, public refreshMethods: RefreshTokenMethods) { }
    
    @Post('admin/login')
    async  doAdminLogin(@Body() data: LoginKorisnikDto, @Req() req: Request): Promise<ApiResponse | LoginInfoKorisnikDto> {
        const korisnik = await this.korisnikService.getByUsername(data.username);
        
            
        if (!korisnik  || !korisnik.isAdmin ) {
            return new Promise(resolve =>
                resolve(new ApiResponse('error', -3001))
            )
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        if (korisnik.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }
        const jwtData = new JwtDataDto()

        jwtData.role = "admin"
        jwtData.korisnikId = korisnik.korisnikId;
        jwtData.username = korisnik.username;
        jwtData.expDate = this.refreshMethods.getDatePlus(300);
        jwtData.ip = req.ip.toString();
        jwtData.userAgent = req.headers["user-agent"];

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret)

        const JwtRefreshData = new JwtRefreshDataDto();
        JwtRefreshData.korisnikId = jwtData.korisnikId;
        JwtRefreshData.role = jwtData.role;
        JwtRefreshData.username = jwtData.username;
        JwtRefreshData.ip = jwtData.ip
        JwtRefreshData.userAgent = jwtData.userAgent;
        JwtRefreshData.expDate = this.refreshMethods.getDatePlus(60 * 60 * 24 * 62); // minute * hour * day * month = lasts two months

        let refreshToken: string = jwt.sign(JwtRefreshData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoKorisnikDto(
            korisnik.korisnikId,
            korisnik.username,
            token,
            refreshToken,
            this.refreshMethods.getIsoDate(JwtRefreshData.expDate),
        )

        await this.korisnikService.addToken(
            korisnik.korisnikId,
            refreshToken,
            this.refreshMethods.getDatabaseDateFormat(this.refreshMethods.getIsoDate(JwtRefreshData.expDate))
        );

        return new Promise(resolve => resolve(responseObject))
    }

    @Post('admin/refresh')
    async adminTokenRefresh(@Req() req: Request, @Body() data: KorisnikRefreshTokenDto): Promise<LoginInfoKorisnikDto | ApiResponse> {
        const korisnikToken = await this.korisnikService.getKorisnikToken(data.token);

        if (!korisnikToken) {
            return new ApiResponse("error", -10002, "No such refresh token!");
        }

        if (korisnikToken.isValid === 0) {
            return new ApiResponse("error", -10003, "The token is no longer valid!");
        }

        const currentDate = new Date();
        const expiryDate = new Date(korisnikToken.expiresAt);

        if (expiryDate.getTime() < currentDate.getTime()) {
            return new ApiResponse("error", -10004, "The token has expired!");
        }

        let jwtRefreshData: JwtRefreshDataDto;

        try {
            jwtRefreshData = jwt.verify(data.token, jwtSecret);
        } catch (e) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (!jwtRefreshData) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtRefreshData.ip !== req.ip.toString()) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtRefreshData.userAgent !== req.headers["user-agent"]) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const jwtData = new JwtDataDto();
        jwtData.role = jwtRefreshData.role;
        jwtData.korisnikId = jwtRefreshData.korisnikId;
        jwtData.username = jwtRefreshData.username;
        jwtData.expDate = this.refreshMethods.getDatePlus(300); // Refreshing the token for 5 additional minutes
        jwtData.ip = jwtRefreshData.ip;
        jwtData.userAgent = jwtRefreshData.userAgent;
        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoKorisnikDto(
            jwtData.korisnikId,
            jwtData.username,
            token,
            data.token,
            this.refreshMethods.getIsoDate(jwtRefreshData.expDate),
        )

        return responseObject;
    }

    @Post('user/login')
    async  doUserLogin(@Body() data: LoginKorisnikDto, @Req() req: Request): Promise<ApiResponse | LoginInfoKorisnikDto> {
        const korisnik = await this.korisnikService.getByUsername(data.username);

        if (!korisnik || korisnik.isAdmin) {
            return new Promise(resolve =>
                resolve(new ApiResponse('error', -3001))
            )
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        if (korisnik.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }
        const jwtData = new JwtDataDto()

        jwtData.role = "user";
        jwtData.korisnikId = korisnik.korisnikId;
        jwtData.username = korisnik.username;
        jwtData.expDate = this.refreshMethods.getDatePlus(300);;
        jwtData.ip = req.ip.toString();
        jwtData.userAgent = req.headers["user-agent"];

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const JwtRefreshData = new JwtRefreshDataDto();
        JwtRefreshData.korisnikId = jwtData.korisnikId;
        JwtRefreshData.role = jwtData.role;
        JwtRefreshData.username = jwtData.username;
        JwtRefreshData.ip = jwtData.ip
        JwtRefreshData.userAgent = jwtData.userAgent;
        JwtRefreshData.expDate = this.refreshMethods.getDatePlus(60 * 60 * 24 * 31); // minute * hour * day * month = lasts one month

        let refreshToken: string = jwt.sign(JwtRefreshData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoKorisnikDto(
            korisnik.korisnikId,
            korisnik.username,
            token,
            refreshToken,
            this.refreshMethods.getIsoDate(JwtRefreshData.expDate),
        )

        await this.korisnikService.addToken(
            korisnik.korisnikId,
            refreshToken,
            this.refreshMethods.getDatabaseDateFormat(this.refreshMethods.getIsoDate(JwtRefreshData.expDate))
        );

        return new Promise(resolve => resolve(responseObject))
    }


    @Post('user/refresh')
    async userTokenRefresh(@Req() req: Request, @Body() data: KorisnikRefreshTokenDto): Promise<LoginInfoKorisnikDto | ApiResponse> {
        const korisnikToken = await this.korisnikService.getKorisnikToken(data.token);

        if (!korisnikToken) {
            return new ApiResponse("error", -10002, "No such refresh token!");
        }

        if (korisnikToken.isValid === 0) {
            return new ApiResponse("error", -10003, "The token is no longer valid!");
        }

        const currentDate = new Date();
        const expiryDate = new Date(korisnikToken.expiresAt);

        if (expiryDate.getTime() < currentDate.getTime()) {
            return new ApiResponse("error", -10004, "The token has expired!");
        }

        let jwtRefreshData: JwtRefreshDataDto;

        try {
            jwtRefreshData = jwt.verify(data.token, jwtSecret);
        } catch (e) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (!jwtRefreshData) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtRefreshData.ip !== req.ip.toString()) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtRefreshData.userAgent !== req.headers["user-agent"]) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const jwtData = new JwtDataDto();
        jwtData.role = jwtRefreshData.role;
        jwtData.korisnikId = jwtRefreshData.korisnikId;
        jwtData.username = jwtRefreshData.username;
        jwtData.expDate = this.refreshMethods.getDatePlus(300); // Refreshing the token for 5 additional minutes
        jwtData.ip = jwtRefreshData.ip;
        jwtData.userAgent = jwtRefreshData.userAgent;
        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoKorisnikDto(
            jwtData.korisnikId,
            jwtData.username,
            token,
            data.token,
            this.refreshMethods.getIsoDate(jwtRefreshData.expDate),
        )

        return responseObject;
    }

    @Put("register")
    async addUser(@Body() data: AddKorisnikDto): Promise<Korisnik | ApiResponse> {
        let korisnik = await this.korisnikService.getByEmail(data.email);
        if (korisnik) {
            return new ApiResponse('error', -7000, 'The email is already in use');
        }

        korisnik = await this.korisnikService.getByUsername(data.username);
        if(korisnik) {
            return new ApiResponse('error', -7001, 'The username is taken');
        }

        return this.korisnikService.add(data);
    }



}

