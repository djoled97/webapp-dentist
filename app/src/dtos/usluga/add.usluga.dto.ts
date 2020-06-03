import * as Validator from "class-validator";
import { UslugaCenaDto } from "./usluga.cena.dto";
import { Validate, ValidateNested, IsDefined } from "class-validator";
import { Type } from 'class-transformer';

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
  
  // kategorijaId:number;
  

  
  @ValidateNested({always:true})
  @Type(()=> UslugaCenaDto)
  cena: UslugaCenaDto;
  kategorija:{
    ime:string
  }
}