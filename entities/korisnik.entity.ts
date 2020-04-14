import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Korisnik {

    @PrimaryGeneratedColumn({ name: 'korisnik_id', type: 'int', unsigned: true })
    korisnikId: number;

    @Column({ name: 'ime', type: 'varchar', length: '64' })
    name: string;

    @Column({ name: 'prezime', type: 'varchar', length: '64' })
    lastName: string;

    @Column({type:'varchar',length:'128'})
    email:string;

    @Column({type:'varchar',length:'128'})
    username:string;

    @Column({name:'password_hash',type:'varchar',length:'64'})
    passwordHash:string;

    @Column({name:'is_admin',type:'tinyint',length:'1'})
    isAdmin:boolean;

}