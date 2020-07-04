export interface FullPatient{
    kartonPacijentId: number,
        ime:string,
        prezime: string,
        datumRodjenja: string,
        korisnikId: number,
        korisnik:{
            ime:string,
            prezime:string,
            
        }
        pregleds: 
            {
                pregledId: number,
                uslugaId: number,
                kartonPacijentId: number,
                datum:Date,
                usluga: {
                    uslugaId: number,
                    kataloskiBroj: number,
                    nazivUsluge: string,
                    opis: string,
                    kategorijaId: number
                

                }[]
            
}
}