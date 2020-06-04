import * as Validator from "class-validator";

export class EditPromoteDto{
    @Validator.IsNotEmpty()
    @Validator.IsBoolean()
    isAdmin:boolean;
}