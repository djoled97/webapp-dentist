export class JwtDataKorisnikDto {
    korisnikId: number;
    username: string;
    expDate: number; // UNIX timestamp
    ip: string;
    userAgent: string;

    toPlainObject() {
        return {
            korisnikId: this.korisnikId,
            username: this.username,
            expDate: this.expDate,
            ip: this.ip,
            userAgent: this.userAgent
        }
    }
}