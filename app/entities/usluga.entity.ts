import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from "typeorm";
import { Cena } from "./cena.entity";
import { Pregled } from "./pregled.entity";
import * as Validator from "class-validator";
import { Kategorija } from "./kategorija.entity";

@Index("FK_usluga_kategorija", ["kategorijaId"], {})
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

  @Column("int", {name: "kategorija_id",unsigned: true, default: () => "'0'",})
  kategorijaId: number;

  @ManyToOne(() => Kategorija, (kategorija) => kategorija.uslugas, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "kategorija_id", referencedColumnName: "kategorijaId" }])
  kategorija: Kategorija;

  @OneToOne(() => Cena, (cena) => cena.usluga)
  cena: Cena;

  @OneToMany(() => Pregled, (pregled) => pregled.usluga)
  pregleds: Pregled[];
}
