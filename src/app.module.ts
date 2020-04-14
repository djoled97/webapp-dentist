import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Database } from 'config/database';
import { Korisnik } from 'entities/korisnik.entity';
import { KorisnikService } from './services/korisnik/korisnik.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:Database.hostname,
      port:3306,
      username:Database.username,
      password:Database.password,
      database:Database.database,
      entities:[Korisnik]
    }),
    TypeOrmModule.forFeature([
      Korisnik
    ])
  ],
  controllers: [AppController],
  providers: [KorisnikService],
})
export class AppModule {}
