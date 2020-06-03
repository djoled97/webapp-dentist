import * as Validator from "class-validator";
import { UslugaCenaDto } from "./usluga.cena.dto";

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
  
  kategorija: string;
  
  
  cena: UslugaCenaDto;
}