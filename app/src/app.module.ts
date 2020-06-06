import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Database } from 'config/database';
import { Korisnik } from 'entities/korisnik.entity';
import { KorisnikService } from './services/korisnik/korisnik.service';
import { Cena } from 'entities/cena.entity';
import { KartonPacijent } from 'entities/karton-pacijent.entity';
import { Usluga } from 'entities/usluga.entity';
import { Pregled } from 'entities/pregled.entity';
import { KorisnikController } from './controllers/api/korisnik.controller';
import { CenaController } from './controllers/api/cena.controller';
import { CenaService } from './services/cena/cena.service';
import { KartonPacijentService } from './services/karton/karton-pacijent.service';
import { KartonPacijentController } from './controllers/api/karton-pacijent.controller';
import { UslugaService } from './services/usluga/usluga.service';
import { UslugaController } from './controllers/api/usluga.controller';
import { AuthService } from './auth/auth/auth.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { KategorijaService } from './services/kategorija/kategorija.service';
import { Kategorija } from 'entities/kategorija.entity';
import { KategorijaController } from './controllers/api/kategorija.controller';
import { PregledService } from './services/pregled/pregled.service';
import { PregledController } from './controllers/api/pregled.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:Database.hostname,
      port:3306,
      username:Database.username,
      password:Database.password,
      database:Database.database,
      entities:[Korisnik,Cena,KartonPacijent,Usluga,Pregled,Kategorija]
    }),
    TypeOrmModule.forFeature([
      Korisnik,
      Cena,
      KartonPacijent,
      Usluga,
      Pregled,
      Kategorija
    ])
  ],
  controllers: [
    AppController,
    KorisnikController,
    CenaController,
    KartonPacijentController,
    UslugaController,
    AuthController,
    KategorijaController,
    PregledController
  ],
  providers: [
    KorisnikService,
    CenaService,
    KartonPacijentService,
    UslugaService,
    AuthService,
    KategorijaService,
    PregledService
  ],
  exports: [
    KorisnikService,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('auth/*')
    .forRoutes('api/*');
  }
}
