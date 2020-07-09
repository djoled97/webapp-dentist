export interface Intervention {
    pregledId: number,
    uslugaId: number,
    kartonPacijentId: number,
    datum: Date
    kartonPacijent: {

        ime: string,
        prezime: string,
        datumRodjenja:string
        korisnik: {

            ime: string,
            prezime: string
        }
        usluga:{
            nazivUsluge:string;
        },
        cena:{
            cenaId: number,
            cenaJedan: number,
            cenaPaket: number,
            cenaUzrast: number
        }
    }
}