import * as Validator from "class-validator";
export class AddKorisnikDto {
    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(2, 42)
    ime: string;

    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(2, 42)
    prezime: string;

    
    @Validator.IsEmail()
    @Validator.IsNotEmpty()
    email: string;
    
    
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[a-zA-Z0-9]*$/) // alphanumeric values
    @Validator.Length(4,32)
    username: string;


    @Validator.IsNotEmpty()
    @Validator.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/) //atleast one upper,lowercase and number min  6 characters 
    @Validator.Length(6,32)
    passwordHash: string;


    @Validator.IsNotEmpty()
    @Validator.IsBoolean()
    isAdmin?: boolean;
}