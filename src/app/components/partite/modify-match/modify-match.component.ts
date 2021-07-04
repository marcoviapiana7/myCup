import { ChiaveValore } from './../../../models/chiave-valore.models';
import { PlayerService } from './../../../services/player.service';
import { ChiaveValoreDropdown } from 'src/app/models/ChiaveValoreDropdown.models';
import { Match } from 'src/app/models/match.models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CupService } from 'src/app/services/cup.service';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/models/player.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'modify-match',
  templateUrl: './modify-match.component.html',
  styleUrls: ['./modify-match.component.scss']
})
export class ModifyMatchComponent implements OnInit {
  @Input() partita: Match;
  @Input() torneo: ChiaveValoreDropdown;
  @Output() endModify = new EventEmitter<boolean>();
  public schermoGrande: boolean;
  public tornei: string[] = [];
  public players: Player[] = [];
  public torneiDropdown: ChiaveValoreDropdown[] = [];
  public showSelectDialog: boolean;
  public squadraSelezionata: string;
  public data: Date;
  public cols: any[] = [];
  public squadra1: string;
  public giocatoriSelezionati: Player[] = [];
  public marcatori1: Player[] = [];
  public assist: Player[] = [];
  public marcatori2: Player[] = [];
  public autogol1: Player[] = [];
  public autogol2: Player[] = [];
  public matchVecchio: string;

  constructor(
    private cupService: CupService,
    private playerService: PlayerService,
    private messageService: MessageService,
    private matchService: MatchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initVariabili();
    if (window.screen.width <= 500) {
      this.schermoGrande = false;
    }
    else {
      this.schermoGrande = true;
    }
    this.getPlayers();
    this.getTornei();
    this.showSelectDialog = false;
    this.getData();
    this.matchVecchio = this.partita.id;
  }

  initVariabili() {
    if (!this.partita.ammoniti) {
      this.partita.ammoniti = [];
    }
    if (!this.partita.espulsi) {
      this.partita.espulsi = [];
    }
    if (!this.partita.marcatori1) {
      this.partita.marcatori1 = {};
    }
    if (!this.partita.marcatori2) {
      this.partita.marcatori2 = {};
    }
    if (!this.partita.assist) {
      this.partita.assist = {};
    }
    if (!this.partita.autogol1) {
      this.partita.autogol1 = {};
    }
    if (!this.partita.autogol2) {
      this.partita.autogol2 = {};
    }
  }

  getMarcatori(marcatore: any, squadra?: number) {
    let x: string;
    if (squadra === 1) {
      this.partita.squadra1.giocatori.forEach(player => {
        if (player.id === marcatore.key) {
          x = player.cognome + ' ' + player.nome[0] + '. '
        }
      })
    }
    if (squadra === 2) {
      this.partita.squadra2.giocatori.forEach(player => {
        if (player.id === marcatore.key) {
          x = player.cognome + ' ' + player.nome[0] + '. '
        }
      })
    }
    else {
      this.partita.squadra2.giocatori.forEach(player => {
        if (player.id === marcatore.key) {
          x = player.cognome + ' ' + player.nome[0] + '. '
        }
      })
      this.partita.squadra1.giocatori.forEach(player => {
        if (player.id === marcatore.key) {
          x = player.cognome + ' ' + player.nome[0] + '. '
        }
      })
    }
    return x;

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

  getData() {
    var dateParts = this.partita.data.split(', ')[0].split("/");

    if (dateParts[2].length === 1) {
      dateParts[2] = '0' + dateParts[2];
    }
    if (dateParts[1].length === 1) {
      dateParts[1] = '0' + dateParts[1];
    }


    this.data = new Date(dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2])
    console.log(this.data)
    this.data.setHours(parseInt(this.partita.ora.split(':')[0]), parseInt(this.partita.ora.split(':')[1]));
    console.log(this.data)
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
    if (sqd === 1 && this.partita.punteggio1 > 0) {
      Object.keys(this.partita.marcatori1).forEach(key => {
        s += this.partita.marcatori1[key];
      })
      Object.keys(this.partita.autogol2).forEach(key => {
        s += this.partita.autogol2[key];
      })
    }

    else if (this.partita.punteggio2 > 0) {
      Object.keys(this.partita.marcatori2).forEach(key => {
        s += this.partita.marcatori2[key];
      })
      Object.keys(this.partita.autogol1).forEach(key => {
        s += this.partita.autogol1[key];
      })
    }
    return s;
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

  salva() {
    this.partita.data = this.data.toLocaleString();
    this.partita.ora = this.data.toLocaleString().split(', ')[1].split(':')[0] + ':' + this.data.toLocaleString().split(', ')[1].split(':')[1];
    this.partita.id = this.matchService.getMatchId(this.partita);
    if (this.partita.squadra1.giocatori.length >= 5 && this.partita.squadra1.giocatori.length >= 5 && this.getGoal(1) === this.partita.punteggio1 && this.getGoal(2) === this.partita.punteggio2) {

      this.matchService.updateMatch(this.partita, this.torneo.value, this.matchVecchio).then(creata => {
        if (creata) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Partita aggiornata' });
          console.log('Partita aggiornata');
          this.endModify.emit(true);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esiste gia una partita in quella data' });
          console.log('Esiste gia una partita in quella data');
        }
      })
    }

    else {
      if (this.partita.squadra1.giocatori.length < 5 || this.partita.squadra1.giocatori.length < 5) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Inserire almeno 5 giocatori per squadra' });
        console.log('Inserire almeno 5 giocatori per squadra');
      }

      else if (this.getGoal(1) !== this.partita.punteggio1 || this.getGoal(2) !== this.partita.punteggio2) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Gol squadra diversi dal punteggio' });
        console.log('Gol squadra diversi dal punteggio');
      }
    }

  }
}
