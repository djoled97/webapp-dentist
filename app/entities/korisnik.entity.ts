import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { KartonPacijent } from "./karton-pacijent.entity";
import * as Validator from "class-validator";
@Index("email", ["email"], { unique: true })
@Index("username", ["username"], { unique: true })
@Entity()
export class Korisnik {
  @PrimaryGeneratedColumn({ type: "int", name: "korisnik_id" })
  korisnikId: number;


  @Column("varchar", { name: "ime", length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2, 42)
  ime: string;

  @Column("varchar", { name: "prezime", length: 64 })
  @Validator.IsString()
  @Validator.IsNotEmpty()
  @Validator.Length(2, 42)
  prezime: string;

  @Column("varchar", { name: "email", unique: true, length: 128 })
  @Validator.IsEmail()
  @Validator.IsNotEmpty()
  email: string;

  @Column("varchar", { name: "username", unique: true, length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Matches(/^[a-z0-9]$/,{message:"One uppercase one lowercase and a number"}) //One uppercase one lowercase and a number
  @Validator.Length(4, 32)
  username: string;

  @Column("varchar", { name: "password_hash", length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')
  passwordHash: string;

  @Column("tinyint", { name: "is_admin", width: 1 })
  @Validator.IsNotEmpty()
  @Validator.IsBoolean()
  isAdmin: boolean;

  @OneToMany(() => KartonPacijent, (kartonPacijent) => kartonPacijent.korisnik)
  kartonPacijents: KartonPacijent[];
}
