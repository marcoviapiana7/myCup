import { ChiaveValore } from './chiave-valore.models';
import { Player } from "./player.model";

export class Match {
    id: string;
    squadra1: Squadra;
    squadra2: Squadra;
    marcatori1: ChiaveValore<number>;
    marcatori2: ChiaveValore<number>;
    autogol1: ChiaveValore<number>;
    autogol2: ChiaveValore<number>;
    assist: ChiaveValore<number>;
    ammoniti: Player[];
    espulsi: Player[];
    punteggio1: number;
    punteggio2: number;
    data: string;
    ora: string;

    constructor() {
        this.squadra1 = new Squadra();
        this.squadra2 = new Squadra();
        this.marcatori1 = {};
        this.marcatori2 = {};
        this.autogol1 = {};
        this.autogol2 = {};
        this.ammoniti = [];
        this.espulsi = [];
        this.assist = {};
        this.punteggio1 = 0;
        this.punteggio2 = 0;
    }
}

export class Squadra {
    nome: string;
    giocatori: Player[];

    constructor() {
        this.nome = '';
        this.giocatori = [];
    }
}