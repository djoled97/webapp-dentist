import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usluga } from "./usluga.entity";
import { KartonPacijent } from "./karton-pacijent.entity";


@Entity()
export class Pregled {
  @PrimaryGeneratedColumn({ type: "int", name: "pregled_id" })
  pregledId: number;

  @Column("int", { name: "usluga_id" })
  uslugaId: number;

  @Column("int", { name: "karton_pacijent_id" })
  kartonPacijentId: number;

  @Column("varchar", { name: "datum", length: 255 })
  datum: string;

  @ManyToOne(() => Usluga, (usluga) => usluga.pregleds, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "usluga_id", referencedColumnName: "uslugaId" }])
  usluga: Usluga;

  @ManyToOne(
    () => KartonPacijent,
    (kartonPacijent) => kartonPacijent.pregleds,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "karton_pacijent_id", referencedColumnName: "kartonPacijentId" },
  ])
  kartonPacijent: KartonPacijent;
}
