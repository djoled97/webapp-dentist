import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cena } from "./cena.entity";
import { Pregled } from "./pregled.entity";
import  * as Validator from "class-validator";

@Entity()
export class Usluga {
  @PrimaryGeneratedColumn({ type: "int", name: "usluga_id" })
  uslugaId: number;

  @Column("int", { name: "kataloski_broj" })
  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  kataloskiBroj: number;

  @Column("varchar", { name: "naziv_usluge", length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  nazivUsluge: string;

  @Column("varchar", { name: "opis", length: 255 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  opis: string;

  @Column("varchar", { name: "kategorija", length: 64 })
  kategorija: string;

  @OneToOne(() => Cena, (cena) => cena.usluga)
  cena: Cena;

  @OneToMany(() => Pregled, (pregled) => pregled.usluga)
  pregleds: Pregled[];
}
