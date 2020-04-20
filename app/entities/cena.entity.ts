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

  @Column( {type:"int", name: "cena_jedan" })
  cenaJedan: number;

  @Column( {type:"int", name: "cena_paket"})
  cenaPaket: number;

  @Column( {type:"int", name: "cena_uzrast"})
  cenaUzrast: number;

  @Column("int", { name: "usluga_id", unique: true })
  uslugaId: number;

  @OneToOne(() => Usluga, (usluga) => usluga.cena, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "usluga_id", referencedColumnName: "uslugaId" }])
  usluga: Usluga;
}
