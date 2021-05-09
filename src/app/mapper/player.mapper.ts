import { Player } from "../models/player.model";

export function mapPlayerExport(players: Player[]) {
    let ret: any[] = [];
    players.forEach(player => {
        const p = {
            nome: player.nome,
            cognome: player.cognome,
            soprannome: player.soprannome,
            ruolo: player.ruolo,
        }
        ret.push(p);
    })
    return ret;
}