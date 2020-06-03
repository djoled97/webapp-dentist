import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usluga } from "../entities/usluga.entity";

@Entity()
export class Kategorija {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "kategorija_id",
    unsigned: true,
  })
  kategorijaId: number;

  @Column("varchar", { name: "ime", length: 50 })
  ime: string;

  @OneToMany(() => Usluga, (usluga) => usluga.kategorija)
  uslugas: Usluga[];
}
