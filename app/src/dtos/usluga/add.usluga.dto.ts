import * as Validator from "class-validator";
import { UslugaCenaDto } from "./usluga.cena.dto";
import { ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { UslugaKategorijaDto } from "./usluga.kategorija.dto";

export class AddUslugaDto {

  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  kataloskiBroj: number;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  nazivUsluge: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  opis: string;





  @ValidateNested({ always: true })
  @Type(() => UslugaCenaDto)
  cena: UslugaCenaDto;

  @ValidateNested({always:true})
  @Type(() => UslugaKategorijaDto)
  kategorija: UslugaKategorijaDto;
}