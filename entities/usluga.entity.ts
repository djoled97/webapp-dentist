import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cena } from "./cena.entity";
import { Pregled } from "./pregled.entity";

@Entity()
export class Usluga {
  @PrimaryGeneratedColumn({ type: "int", name: "usluga_id" })
  uslugaId: number;

  @Column("int", { name: "kataloski_broj" })
  kataloskiBroj: number;

  @Column("varchar", { name: "naziv_usluge", length: 64 })
  nazivUsluge: string;

  @Column("varchar", { name: "opis", length: 255 })
  opis: string;

  @Column("varchar", { name: "kategorija", length: 64 })
  kategorija: string;

  @OneToOne(() => Cena, (cena) => cena.usluga)
  cena: Cena;

  @OneToMany(() => Pregled, (pregled) => pregled.usluga)
  pregleds: Pregled[];
}
