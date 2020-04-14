import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Korisnik {

    @PrimaryGeneratedColumn({ name: 'korisnik_id', type: 'int', unsigned: true })
    korisnikId: number;

    @Column({ name: 'ime', type: 'varchar', length: '64',nullable:true })
    name: string;

    @Column({ name: 'prezime', type: 'varchar', length: '64',nullable:true })
    lastName: string;

    @Column({type:'varchar',length:'128',unique:true,nullable:true})
    email:string;

    @Column({type:'varchar',length:'128',unique:true,nullable:true})
    username:string;

    @Column({name:'password_hash',type:'varchar',length:'128',nullable:true})
    passwordHash:string;

    @Column({name:'is_admin',type:'tinyint',length:'1',nullable:true})
    isAdmin:boolean;

}