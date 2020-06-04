import * as Validator from "class-validator";
export class UslugaKategorijaDto{
    @Validator.IsNotEmpty()
    @Validator.IsString()
    ime:string
}