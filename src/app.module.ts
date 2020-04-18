import { Module } from '@nestjs/common';
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
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:Database.hostname,
      port:3306,
      username:Database.username,
      password:Database.password,
      database:Database.database,
      entities:[Korisnik,Cena,KartonPacijent,Usluga,Pregled]
    }),
    TypeOrmModule.forFeature([
      Korisnik,Cena,KartonPacijent,Usluga,Pregled
    ])
  ],
  controllers: [AppController,KorisnikController,CenaController,KartonPacijentController,UslugaController],
  providers: [KorisnikService,CenaService,KartonPacijentService,UslugaService],
})
export class AppModule {}
