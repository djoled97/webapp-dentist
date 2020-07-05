export interface Intervention {
    pregledId: number,
    uslugaId: number,
    kartonPacijentId: number,
    datum: Date
    kartonPacijent: {

        ime: string,
        prezime: string,

        korisnik: {

            ime: string,
            prezime: string
        }
        usluga:{
            nazivUsluge:string;
        }
    }
}