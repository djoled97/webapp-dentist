import * as Validator from "class-validator";
export class editKorsinikDto {
    @Validator.IsNotEmpty()
    @Validator.IsEmail()
    email: string;
    
   
    @Validator.IsNotEmpty()
    @Validator.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    {message:"password must have atleast  6 chars , one uppercase,lowercase letter and number"}) //atleast one upper,lowercase and number min  6 characters 
    passwordHash: string;
}