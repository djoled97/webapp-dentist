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
    @Validator.Matches(/^[a-z0-9]{5,}$/, {
        message: "Username must be longer than 5 characters and only contain alphanumeric characters"
    }) // alphanumeric values

    username: string;


    @Validator.IsNotEmpty()
    @Validator.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        { message: "password must be atleast 6 chars long , one uppercase,lowercase letter and number" }) //atleast one upper,lowercase and number min  6 characters 
    passwordHash: string;


}