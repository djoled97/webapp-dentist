import * as Validator from "class-validator";
export class editKorsinikDto {
    @Validator.IsNotEmpty()
    @Validator.IsEmail()
    email: string;
    
   
    @Validator.IsNotEmpty()
    @Validator.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/) //atleast one upper,lowercase and number min  6 characters 
    @Validator.Length(6,32)
    passwordHash: string;
}