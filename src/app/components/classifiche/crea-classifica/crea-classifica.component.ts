import { FileTransferObject } from '@ionic-native/file-transfer';
import { ClassifichePlayer } from './../../../models/classificaPlayer.models';
import { ChiaveValoreDropdown } from 'src/app/models/ChiaveValoreDropdown.models';
import { PlayerService } from 'src/app/services/player.service';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { CupService } from 'src/app/services/cup.service';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/models/player.model';
import { Match } from 'src/app/models/match.models';
import * as xlsx from 'xlsx';
import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import JSPDF from 'jspdf';

@Component({
  selector: 'crea-classifica',
  templateUrl: './crea-classifica.component.html',
  styleUrls: ['./crea-classifica.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreaClassificaComponent implements OnInit {
  public players: Player[];
  public torneo: ChiaveValoreDropdown;
  public tornei: string[] = [];
  public torneiDropdown: ChiaveValoreDropdown[] = [];
  public cols: any[] = [];
  public matches: Match[] = [];
  public playersClassifica: ClassifichePlayer[] = [];
  public multiSortMeta = [];
  public schermoGrande: boolean;
  public showed: boolean;
  public excelFile: any;
  public email: string;

  constructor(
    private playerService: PlayerService,
    private matchService: MatchService,
    private cupService: CupService,
    private file: File,
    private fileOpener: FileOpener
  ) { }

  ngOnInit(): void {
    this.showed = false;
    this.onOrientationChange(null)
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'cognome', header: 'Cognome' },
      { field: 'vinte', header: 'Vinte' },
      { field: 'pareggiate', header: 'Pareggiate' },
      { field: 'perse', header: 'Perse' },
      { field: 'giocate', header: 'Giocate' },
      { field: 'punti', header: 'Punti' },
      { field: 'media', header: 'Media' },
      { field: 'fattore', header: 'Fattore' },
      { field: 'mediaPuntiCorretta', header: 'MediaPuntiCorretta' },
    ];
    this.getTornei();
    this.getPlayers();
    this.multiSortMeta = [{ field: 'mediaFattore', order: -1 }, { field: 'giocate', order: -1 }, { field: 'vinte', order: -1 }, { field: 'gol', order: -1 }, { field: 'pareggiate', order: -1 }, { field: 'perse', order: 1 }]
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    console.log('orientationChanged');
    if (window.screen.width <= 500) {
      this.schermoGrande = false;
    }
    else {
      this.schermoGrande = true;
    }
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

  getPlayerClassifica(players: Player[]) {
    players.forEach(player => {
      let playerC: ClassifichePlayer = {
        nome: player.nome,
        cognome: player.cognome,
        vinte: this.getVinte(player),
        pareggiate: this.getPareggiate(player),
        perse: this.getPerse(player),
        giocate: this.getGiocate(player),
        punti: this.getPunti(player),
        mediaPunti: this.getMediaPunti(player),
        fattore: this.getFattore(player),
        mediaFattore: this.getMediaFattore(player),
        gol: this.getGoal(player),
        autogol: this.getAutogol(player)
      }

      this.playersClassifica.push(playerC);
    })
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

  getVinte(player: Player) {
    let v = 0;
    this.matches.forEach(match => {
      let squadra1: Player[] = match.squadra1.giocatori;
      let squadra2: Player[] = match.squadra2.giocatori;
      if (match.punteggio1 > match.punteggio2 && this.isIncluded(squadra1, player) > 0) {
        v++;
      }
      else if (match.punteggio2 > match.punteggio1 && this.isIncluded(squadra2, player) > 0) {
        v++;
      }
    });
    return v;
  }

  getPareggiate(player: Player) {
    let s = 0;
    if (this.matches.length > 0) {
      this.matches.forEach(match => {
        let squadra1: Player[] = match.squadra1.giocatori;
        let squadra2: Player[] = match.squadra2.giocatori;
        if (match.punteggio1 === match.punteggio2 && (this.isIncluded(squadra1, player) > 0 || this.isIncluded(squadra2, player) > 0)) {
          s++;
        }
      })
      return s || 0;
    }
  }

  getPerse(player: Player) {
    let v = 0;
    this.matches.forEach(match => {
      let squadra1: Player[] = match.squadra1.giocatori;
      let squadra2: Player[] = match.squadra2.giocatori;
      if (match.punteggio1 < match.punteggio2 && this.isIncluded(squadra1, player) > 0) {
        v++;
      }
      else if (match.punteggio2 < match.punteggio1 && this.isIncluded(squadra2, player) > 0) {
        v++;
      }
    });
    return v;
  }

  getAllMatches() {
    if (this.torneo) {
      this.matchService.getMatches(this.torneo.value).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.matches = data;
        this.getPlayerClassifica(this.players);
      });
    }
  }

  getPunti(player: Player) {
    return (this.getVinte(player) * 3) || 0;
  }

  getMediaPunti(player: Player) {
    return (this.getPunti(player) / this.getGiocate(player)) || 0;
  }

  getGiocate(player: Player) {
    let g = 0;
    this.matches.forEach(match => {
      if (this.isIncluded(match.squadra1.giocatori, player) > 0 || this.isIncluded(match.squadra2.giocatori, player) > 0) {
        g++;
      }
    })
    return g;
  }

  getFattore(player: Player) {
    return Math.floor(this.getGiocate(player) / 7);
  }

  getMediaFattore(player: Player) {
    return ((this.getMediaPunti(player) + this.getFattore(player)) / 2) || 0;
  }

  getGoal(player: Player) {
    let g = 0;
    if (this.matches.length > 0) {
      this.matches.forEach(match => {
        if (Object.keys(match.marcatori1).includes(player.id) || Object.keys(match.marcatori2).includes(player.id)) {
          g++;
        }
      })
    }
    return g || 0;
  }

  getAutogol(player: Player) {
    let g = 0;
    if (this.matches.length > 0) {
      this.matches.forEach(match => {
        if ((match.autogol1 && Object.keys(match.autogol1).includes(player.id)) || (match.autogol2 && Object.keys(match.autogol2).includes(player.id))) {
          g++;
        }
      });
    }
    return g || 0;
  }

  isIncluded(squadra: Player[], player: Player) {
    let c = 0;
    squadra.forEach(playerSq => {
      if (JSON.stringify(playerSq.id) === JSON.stringify(player.id) && JSON.stringify(playerSq.nome) === JSON.stringify(player.nome) && JSON.stringify(playerSq.cognome) === JSON.stringify(player.cognome)) {
        c++;
      }
    })
    return c;
  }

  exportExcel() {
    const worksheet = xlsx.utils.json_to_sheet(this.playersClassifica);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "classifica");
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.ms-excel';
    let EXCEL_EXTENSION = '.xls';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    // let a = window.document.createElement("a");
    // a.href = window.URL.createObjectURL(data);
    // a.download = "excelFile.xls";
    // a.click();



    const directory = this.file.dataDirectory;
    const pdfFile = "classifica.xls";
    let iWriteOptions: IWriteOptions = {
      replace: true
    };

    this.file.checkFile(directory, pdfFile)
      .then((res) => {
        this.file.writeFile(directory, pdfFile, buffer, iWriteOptions)
          .then((res) => {

            console.log("File generated" + JSON.stringify(res));

            this.fileOpener.open(this.file.dataDirectory + pdfFile, EXCEL_TYPE)
              .then(() => console.log('File is exported'))
              .catch(e => console.log(e));
          })
          .catch((error) => {
            console.log(JSON.stringify(error));
          });
      })
      .catch((error) => {
        this.file.writeFile(directory, pdfFile, buffer)
          .then((res) => {

            console.log("File created" + JSON.stringify(res));

            this.fileOpener.open(this.file.dataDirectory + pdfFile, EXCEL_TYPE)
              .then(() => console.log('File exported'))
              .catch(e => console.log(e));
          })
          .catch((error) => {
            console.log(JSON.stringify(error));
          });
      });
  }

  generatePdf() {
    const pdfEle = document.getElementById("capture");
    pdfEle.style.width = "fit-content";

    const options = {
      background: "white",
      height: pdfEle.scrollHeight,
      width: pdfEle.clientHeight
    };

    domtoimage.toPng(pdfEle, options).then((filePath) => {
      pdfEle.style.width = "auto";
      var jsPdfDoc = new JSPDF("p", "mm", "a4");

      jsPdfDoc.addImage(filePath, 'PNG', 12, 12, 220, 240);

      let docRes = jsPdfDoc.output();
      let arrayBuffer = new ArrayBuffer(docRes.length);
      let uintArray = new Uint8Array(arrayBuffer);

      for (var i = 0; i < docRes.length; i++) {
        uintArray[i] = docRes.charCodeAt(i);
      }


      const directory = this.file.dataDirectory;
      const pdfFile = "pdfFile.pdf";

      let iWriteOptions: IWriteOptions = {
        replace: true
      };

      this.file.checkFile(directory, pdfFile)
        .then((res) => {
          this.file.writeFile(directory, pdfFile, arrayBuffer, iWriteOptions)
            .then((res) => {

              console.log("File generated" + JSON.stringify(res));

              this.fileOpener.open(this.file.dataDirectory + pdfFile, 'application/pdf')
                .then(() => console.log('File is exported'))
                .catch(e => console.log(e));
            })
            .catch((error) => {
              console.log(JSON.stringify(error));
            });
        })
        .catch((error) => {
          this.file.writeFile(directory, pdfFile, arrayBuffer)
            .then((res) => {

              console.log("File created" + JSON.stringify(res));

              this.fileOpener.open(this.file.dataDirectory + pdfFile, 'application/pdf')
                .then(() => console.log('File exported'))
                .catch(e => console.log(e));
            })
            .catch((error) => {
              console.log(JSON.stringify(error));
            });
        });
    })
      .catch(function (error) {
        console.error(error);
      });
  }

}
