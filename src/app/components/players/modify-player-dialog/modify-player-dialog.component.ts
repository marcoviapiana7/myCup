import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'modify-player-dialog',
  templateUrl: './modify-player-dialog.component.html',
  styleUrls: ['./modify-player-dialog.component.css']
})
export class ModifyPlayerDialogComponent implements OnInit {
  @Input() player: Player;
  public playerCopy: Player;
  @Output() modifyEmitter = new EventEmitter<boolean>();
  public ruolo: string[] = [];
  public showed: boolean;
  public imgSrc: string;
  public selectedImage: any = null;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private playerRef: PlayerService, private afStorage: AngularFireStorage, private messageService: MessageService) { }

  ngOnInit(): void {
    this.ruolo = ['Portiere', 'Difensore', 'Centrocampista', 'Attaccante'];
    this.showed = true
    this.playerCopy = { ...this.player };
  }

  modificaGiocatore() {
    if (this.selectedImage) {
      const words: string[] = this.selectedImage.name.split('.');
      const name = this.player.id + '.' + words[words.length - 1];
      const filePath = '/profilePicture/' + this.player.id + '/' + name;
      var storageRef = this.afStorage.ref(filePath);
      var task = storageRef.put(this.selectedImage);
      this.afStorage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((url) => {
            this.player.foto = url;
            this.modifyPlayer();
          })
        })
      ).subscribe();
    }
    else {
      this.modifyPlayer()
    }
  }

  modifyPlayer() {
    this.player.id = this.playerRef.getPlayerId(this.player);
    this.playerRef.update(this.player, this.playerCopy);
    this.closeDialog();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Giocatore modificato' });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
  }

  closeDialog() {
    this.showed = false;
    this.rimuoviFoto()
    this.modifyEmitter.emit(this.showed);
  }

  rimuoviFoto() {
    this.player.foto = undefined;
    this.selectedImage = undefined;
    this.imgSrc = undefined;
    this.inputFile.nativeElement.value = "";
  }
}
