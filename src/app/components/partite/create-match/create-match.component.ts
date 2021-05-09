import { MatchService } from './../../../services/match.service';
import { MessageService } from 'primeng/api';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Match } from 'src/app/models/match.models';
import { Player } from 'src/app/models/player.model';
import { CupService } from 'src/app/services/cup.service';
import { PlayerService } from 'src/app/services/player.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ChiaveValoreDropdown } from 'src/app/models/ChiaveValoreDropdown.models';

@Component({
  selector: 'create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateMatchComponent implements OnInit {
  public partita: Match = new Match();
  @Input() partitaModify: Match;
  public torneo: ChiaveValoreDropdown;
  public data: Date;
  public tornei: string[] = [];
  public players: Player[] = [];
  public cols: any[] = [];
  public squadra1: string;
  public showSelectDialog: boolean;
  public giocatoriSelezionati: Player[] = [];
  public squadraSelezionata: string;
  public marcatori1: Player[] = [];
  public campo: string;
  public assist: Player[] = [];
  public marcatori2: Player[] = [];
  public autogol1: Player[] = [];
  public autogol2: Player[] = [];
  public torneiDropdown: ChiaveValoreDropdown[] = [];
  public avversari: Player[] = [];


  constructor(
    private messageService: MessageService,
    private cupService: CupService,
    private playerService: PlayerService,
    private matchService: MatchService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    if (this.partitaModify) {
      this.partita = this.partitaModify;
    }
    else {
      this.campo = 'Campo';
      this.getTornei();
      this.data = new Date();
      this.data.setHours(18, 0);
      this.getPlayers();
      this.partita.squadra1.nome = 'Squadra1';
      this.partita.squadra2.nome = 'Squadra2';
      this.cols = [
        { field: 'nome', header: 'Nome' },
        { field: 'cognome', header: 'Cognome' },
        { field: 'ruolo', header: 'Ruolo' },
        { field: 'valore', header: 'Valore' }
      ];
      this.showSelectDialog = false;
    }
  }

  getTornei() {
    this.cupService.getCupsId().then(val => {
      this.tornei = val;
      this.tornei.forEach(torneo => {
        let x: ChiaveValoreDropdown = new ChiaveValoreDropdown();
        x.key = torneo;
        x.value = torneo;
        this.torneiDropdown.push(x)
      })
    })
  }

  getPlayers() {
    this.playerService.getPlayers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.players = data;
    });
  }

  selezionaGiocatori(players: Player[]) {
    this.showSelectDialog = false;
    if (players) {
      if (this.squadraSelezionata === '1') {
        this.partita.squadra1.giocatori = players;
      }
      if (this.squadraSelezionata === '2') {
        this.partita.squadra2.giocatori = players;
      }
      if (this.squadraSelezionata === '3') {
        this.creaFormazioni(players);
      }
    }
  }

  eliminaGiocatore(playerDel: Player, squadra: string) {
    let indice: number;
    if (squadra === '1') {
      this.partita.squadra1.giocatori.forEach((player, i) => {
        if (player === playerDel) {
          indice = i;
        }
      });
      this.partita.squadra1.giocatori.splice(indice, 1);
      this.giocatoreEliminato(playerDel, squadra);
    }
    else if (squadra === '2') {
      this.partita.squadra2.giocatori.forEach((player, i) => {
        if (player === playerDel) {
          indice = i;
        }
      });
      this.partita.squadra2.giocatori.splice(indice, 1);
      this.giocatoreEliminato(playerDel, squadra);
    }
  }

  addAmmonito(player: Player) {
    if (!this.partita.ammoniti.includes(player)) {
      this.partita.ammoniti.push(player)
    }
    else {
      const i = this.partita.ammoniti.indexOf(player);
      this.partita.ammoniti.splice(i, 1);
    }
  }

  addEspulso(player: Player) {
    if (!this.partita.espulsi.includes(player)) {
      this.partita.espulsi.push(player)
    }
    else {
      const i = this.partita.espulsi.indexOf(player);
      this.partita.espulsi.splice(i, 1);
    }
  }

  addGoal(player: Player, id: string) {
    if (id === '1') {
      if (!Object.keys(this.partita.marcatori1).includes(player.id)) {
        this.partita.marcatori1[player.id] = 1;
        this.marcatori1.push(player);
      }
      else {
        this.partita.marcatori1[player.id]++;
      }
    }
    else if (id === '2') {
      if (!Object.keys(this.partita.marcatori2).includes(player.id)) {
        this.partita.marcatori2[player.id] = 1;
        this.marcatori2.push(player);
      }
      else {
        this.partita.marcatori2[player.id]++;
      }
    }
  }

  deleteGoal(player: Player, id: string) {
    if (id === '1') {
      if (Object.keys(this.partita.marcatori1).includes(player.id)) {
        if (this.partita.marcatori1[player.id] === 1) {
          delete this.partita.marcatori1[player.id];
          this.marcatori1.splice(this.marcatori1.indexOf(player), 1);
        }
        else {
          this.partita.marcatori1[player.id] -= 1;
        }
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Errore, il giocatore non ha segnato alcun goal' });
        console.log('Errore, il giocatore non ha segnato alcun goal');
      }
    }
    else if (id === '2') {
      if (Object.keys(this.partita.marcatori2).includes(player.id)) {
        if (this.partita.marcatori2[player.id] === 1) {
          delete this.partita.marcatori2[player.id];
          this.marcatori2.splice(this.marcatori2.indexOf(player), 2);
        }
        else {
          this.partita.marcatori2[player.id] -= 1;
        }
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Errore, il giocatore non ha segnato alcun goal' });
        console.log('Errore, il giocatore non ha segnato alcun goal');
      }
    }
  }

  addAssist(player: Player) {
    if (!Object.keys(this.partita.assist).includes(player.id)) {
      this.partita.assist[player.id] = 1;
      this.assist.push(player);
    }
    else {
      this.partita.assist[player.id]++;
    }
  }

  deleteAllAssist() {
    this.assist = [];
    this.partita.assist = {}
  }

  addAutogol(player: Player, id: string) {
    if (id === '1') {
      if (!Object.keys(this.partita.autogol1).includes(player.id)) {
        this.partita.autogol1[player.id] = 1;
        this.autogol2.push(player);
      }
      else {
        this.partita.autogol1[player.id]++;
      }
    }
    else if (id === '2') {
      if (!Object.keys(this.partita.autogol2).includes(player.id)) {
        this.partita.autogol2[player.id] = 1;
        this.autogol1.push(player);
      }
      else {
        this.partita.autogol2[player.id]++;
      }
    }
  }

  deleteAllAutogol() {
    this.partita.autogol1 = {};
    this.partita.autogol2 = {};
    this.autogol1 = [];
    this.autogol2 = [];
  }

  giocatoreEliminato(player: Player, squadra: string) {
    if (squadra === '1') {
      this.autogol2.splice(this.autogol2.indexOf(player), 1);
      this.marcatori1.splice(this.marcatori1.indexOf(player), 1);
      delete this.partita.marcatori1[player.id];
      delete this.partita.autogol1[player.id];
    }
    else if (squadra === '2') {
      this.autogol1.splice(this.autogol1.indexOf(player), 1);
      this.marcatori2.splice(this.marcatori2.indexOf(player), 1);
      delete this.partita.marcatori2[player.id];
      delete this.partita.autogol2[player.id];
    }
    delete this.partita.assist[player.id];
  }

  getGoal(sqd: number) {
    let s: number = 0;
    if (sqd === 1) {
      Object.keys(this.partita.marcatori1).forEach(key => {
        s += this.partita.marcatori1[key];
      })
      Object.keys(this.partita.autogol2).forEach(key => {
        s += this.partita.autogol2[key];
      })
    }

    else {
      Object.keys(this.partita.marcatori2).forEach(key => {
        s += this.partita.marcatori2[key];
      })
      Object.keys(this.partita.autogol1).forEach(key => {
        s += this.partita.autogol1[key];
      })
    }
    return s
  }

  getConvocatiRuolo(ruolo: string, sqd: number) {
    let c = 0;
    if (sqd === 1) {
      this.partita.squadra1.giocatori.forEach(element => {
        if (element.ruolo[0] === ruolo) {
          c++;
        }
      });
    }
    else {
      this.partita.squadra2.giocatori.forEach(element => {
        if (element.ruolo[0] === ruolo) {
          c++;
        }
      });
    }
    return (c > 0);
  }

  assistCheck() {
    let a = 0;
    Object.keys(this.partita.assist).forEach(assistMan => {
      a += this.partita.assist[assistMan];
    })
    return a < this.partita.punteggio1 + this.partita.punteggio2;
  }

  salva() {
    this.partita.punteggio1 = this.getGoal(1);
    this.partita.punteggio2 = this.getGoal(2);
    this.partita.data = this.data.toLocaleString();
    this.partita.ora = this.data.toLocaleString().split(', ')[1].split(':')[0] + ':' + this.data.toLocaleString().split(', ')[1].split(':')[1];
    this.partita.id = this.matchService.getMatchId(this.partita);
    if (this.partita.squadra1.giocatori.length >= 5 &&
      this.partita.squadra1.giocatori.length >= 5 && this.assistCheck()) {

      this.matchService.addMatch(this.partita, this.torneo.value).then(creato => {
        if (creato) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Partita creata' });
          console.log('Partita creata');
          this.reset();
          this.router.navigate(['home/dashboard']);
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Partita già esistente in questa data e con questa ora' });
          console.log('Partita già esistente');
        }
      })
    }

    else {
      if (this.partita.squadra1.giocatori.length < 5 || this.partita.squadra1.giocatori.length < 5) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Inserire almeno 5 giocatori per squadra' });
        console.log('Inserire almeno 5 giocatori per squadra');
      }
      else if (!this.assistCheck()) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Assist > gol totali' });
        console.log('Assist > gol totali');
      }
    }

  }

  reset() {
    this.partita = new Match();
  }

  generaFormazioni() {
    this.partita.squadra1.giocatori = [];
    this.partita.squadra2.giocatori = [];
    this.reset();
    this.showSelectDialog = true;
    this.partita.squadra1.nome = 'Squadra1';
    this.partita.squadra2.nome = 'Squadra2';
    this.squadraSelezionata = '3';
  }

  creaFormazioni(players: Player[]) {
    let portieri: Player[] = [];
    let difensori: Player[] = [];
    let centrocampisti: Player[] = [];
    let attaccanti: Player[] = [];

    players.sort(function (x, y) {
      if (x.valore < y.valore) {
        return -1;
      }
      if (x.valore > y.valore) {
        return 1;
      }
      return 0;
    });

    players.forEach(player => {
      if (player.ruolo === 'Portiere') {
        portieri.push(player);
      }

      else if (player.ruolo === 'Difensore') {
        difensori.push(player);
      }

      else if (player.ruolo === 'Centrocampista') {
        centrocampisti.push(player);
      }

      else if (player.ruolo === 'Attaccante') {
        attaccanti.push(player);
      }
    });

    portieri.forEach((portiere, i) => {
      i % 2 === 0 ? this.partita.squadra1.giocatori.push(portiere) : this.partita.squadra2.giocatori.push(portiere);
    })

    difensori.forEach((difensore, i) => {
      i % 2 === 0 ? this.partita.squadra2.giocatori.push(difensore) : this.partita.squadra1.giocatori.push(difensore);
    })

    centrocampisti.forEach((centrocampista, i) => {
      i % 2 === 0 ? this.partita.squadra1.giocatori.push(centrocampista) : this.partita.squadra2.giocatori.push(centrocampista);
    })

    attaccanti.forEach((attaccante, i) => {
      i % 2 === 0 ? this.partita.squadra2.giocatori.push(attaccante) : this.partita.squadra1.giocatori.push(attaccante);
    })

  }

}
