import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usluga } from "./usluga.entity";

@Index("usluga_id_uniq", ["uslugaId"], { unique: true })

@Entity()
export class Cena {
  @PrimaryGeneratedColumn({ type: "int", name: "cena_id" })
  cenaId: number;

  @Column("varchar", { name: "cena_jedan", length: 255 })
  cenaJedan: string;

  @Column("varchar", { name: "cena_paket", length: 255 })
  cenaPaket: string;

  @Column("varchar", { name: "cena_uzrast", length: 255 })
  cenaUzrast: string;

  @Column("int", { name: "usluga_id", unique: true })
  uslugaId: number;

  @OneToOne(() => Usluga, (usluga) => usluga.cena, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "usluga_id", referencedColumnName: "uslugaId" }])
  usluga: Usluga;
}
