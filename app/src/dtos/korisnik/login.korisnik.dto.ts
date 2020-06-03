import * as Validator from "class-validator";
export class LoginKorisnikDto {

    @Validator.IsNotEmpty()
    @Validator.IsString()
    username: string;
    
    @Validator.IsNotEmpty()
    @Validator.IsString()
    password: string;
}