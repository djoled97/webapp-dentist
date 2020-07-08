import * as Validator from "class-validator";

export class AddKategorijaDto {
    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(2, 42)
    ime: string;
}