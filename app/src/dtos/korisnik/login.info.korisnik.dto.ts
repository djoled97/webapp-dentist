export class LoginInfoKorisnikDto {
    korisnikId: number;
    username: string;
    token: string;

    constructor (id: number, un: string, jwt: string) {
        this.korisnikId = id;
        this.username = un;
        this.token = jwt;
    }
}