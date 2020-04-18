export class AddUslugaDto{
    kataloskiBroj:number;
    nazivUsluge:string;
    opis:string;
    kategorija:string;
    cena:{
        cenaJedan:number;
        cenaPaket:number;
        cenaUzrast:number;
    }
}