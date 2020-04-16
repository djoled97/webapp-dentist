import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Korisnik } from "./korisnik.entity";
import { Pregled } from "./pregled.entity";


@Entity()
export class KartonPacijent {
  @PrimaryGeneratedColumn({ type: "int", name: "karton_pacijent_id" })
  kartonPacijentId: number;

  @Column("varchar", { name: "ime", length: 64 })
  ime: string;

  @Column("varchar", { name: "prezime", length: 64 })
  prezime: string;

  @Column("varchar", { name: "datum_rodjenja", length: 255 })
  datumRodjenja: string;

  @Column("int", { name: "korisnik_id" })
  korisnikId: number;

  @ManyToOne(() => Korisnik, (korisnik) => korisnik.kartonPacijents, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "korisnik_id", referencedColumnName: "korisnikId" }])
  korisnik: Korisnik;

  @OneToMany(() => Pregled, (pregled) => pregled.kartonPacijent)
  pregleds: Pregled[];
}
