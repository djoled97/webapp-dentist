import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { KartonPacijent } from "./karton-pacijent.entity";

@Index("email", ["email"], { unique: true })
@Index("username", ["username"], { unique: true })
@Entity()
export class Korisnik {
  @PrimaryGeneratedColumn({ type: "int", name: "korisnik_id" })
  korisnikId: number;

  @Column("varchar", { name: "ime", length: 64 })
  ime: string;

  @Column("varchar", { name: "prezime", length: 64 })
  prezime: string;

  @Column("varchar", { name: "email", unique: true, length: 128 })
  email: string;

  @Column("varchar", { name: "username", unique: true, length: 128 })
  username: string;

  @Column("varchar", { name: "password_hash", length: 128 })
  passwordHash: string;

  @Column("tinyint", { name: "is_admin", width: 1 })
  isAdmin: boolean;

  @OneToMany(() => KartonPacijent, (kartonPacijent) => kartonPacijent.korisnik)
  kartonPacijents: KartonPacijent[];
}
