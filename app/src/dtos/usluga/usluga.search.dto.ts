import * as Validator from "class-validator";

export class UslugaSerachDto{
    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.Length(0,128)
    keywords:string
}