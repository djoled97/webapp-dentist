import * as Validator from "class-validator";
export class UslugaCenaDto {



    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    cenaJedan: number;
    
    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    cenaPaket: number;
    
    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    cenaUzrast: number;



}