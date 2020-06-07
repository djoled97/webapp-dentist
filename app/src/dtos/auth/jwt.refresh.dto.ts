export class JwtRefreshDataDto {
    
    role:"admin"|"user";
    korisnikId: number;
    username: string;
    expDate: number; // UNIX timestamp
    ip: string;
    userAgent: string;

    toPlainObject() {
        return {
            
            role:this.role,
            korisnikId: this.korisnikId,
            username: this.username,
            expDate: this.expDate,
            ip: this.ip,
            userAgent: this.userAgent,
        }
    }
}