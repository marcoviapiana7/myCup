import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { mapPlayerExport } from 'src/app/mapper/player.mapper';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'modify-player',
  templateUrl: './modify-player.component.html',
  styleUrls: ['./modify-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModifyPlayerComponent implements OnInit {
  public players: Player[] = [];
  public selectedPlayers: Player[] = [];
  public modifyPlayer: Player;
  public modifyPlayerDialog: boolean;
  public schermoGrande: boolean;

  constructor(
    private playerRef: PlayerService,
    private router: Router,
    private sanitizer: DomSanitizer,
    public afStorage: AngularFireStorage,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.onOrientationChange(null);
    this.getAllPlayers();
    this.modifyPlayerDialog = false;
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

  getAllPlayers() {
    this.playerRef.getPlayers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.players = data;
    });
  }

  deleteSelectedPlayersMessage() {
    this.messageService.add({ key: 'c', severity: 'warn', summary: 'Attenzione', detail: 'Sei sicuro di voler eliminare i giocatori selezionati ?' });
  }
  deleteSelectedPlayers(confirm: boolean) {
    if (confirm) {
      this.selectedPlayers.forEach(player => {
        this.playerRef.deletePlayer(player);
      })
    }
    this.messageService.clear();
    this.selectedPlayers = []
  }
  editPlayer(player: Player) {
    this.modifyPlayerDialog = true;
    this.modifyPlayer = player;
  }

  closeModifyDialog() {
    this.modifyPlayerDialog = false;
  }

  deletePlayer(player: Player) {
    this.messageService.add({ key: 'c', severity: 'warn', summary: 'Attenzione', detail: 'Sei sicuro di voler eliminare i giocatori selezionati ?' });
    this.selectedPlayers.push(player)
  }

  createPlayer() {
    this.router.navigate(['home/create-player'])
  }

  esporta() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(mapPlayerExport(this.players));
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "giocatori");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
}
