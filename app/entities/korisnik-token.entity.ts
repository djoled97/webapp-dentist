import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";

  import * as Validator from "class-validator";
  
  @Entity("korisnik_token")
  export class KorisnikToken {
    @PrimaryGeneratedColumn({ type: "int", name: "korisnik_token_id" })
    korisnikTokenId: number;
  
    @Column({type: "int", name: "korisnik_id"})
    korisnikId: number;

    @Column({type: "timestamp", name: "created_at"})
    createdAt: string;

    @Column({type: "text"})
    @Validator.IsNotEmpty()
    @Validator.IsString()
    token: string;

    @Column({type: "datetime", name: "expires_at"})
    expiresAt: string;

    @Column({type: "tinyint", name: "is_valid", default: 1})
    @Validator.IsNotEmpty()
    @Validator.IsIn([ 0, 1 ])
    isValid: number;
  }