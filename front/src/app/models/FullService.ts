export interface FullService {
    kataloskiBroj: number;
    nazivUsluge: string;
    opis: string;

    kategorija: {
        kategorijaId: number,
        ime: string
    }

    cena: {
        cenaId: number,
        cenaJedan: number,
        cenaPaket: number,
        cenaUzrast: number
    }
}