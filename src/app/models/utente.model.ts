export class Utente {
    email: string;
    uid: string;
    emailVerified: boolean;
    photoURL: string;
    displayName: string;
    phoneNumber: string;
}

export class UserLogIn {
    email: string;
    password: string;
    nome: string;
    cognome: string;
    cellulare: string;
    user: string;
    foto?: string;
}