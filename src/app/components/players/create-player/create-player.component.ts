
import { Component, ElementRef, HostListener, OnInit, Sanitizer, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Player } from 'src/app/models/player.model';
import { ViewChild } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePlayerComponent implements OnInit {
  public player: Player = new Player();
  public fileBuffer: ArrayBuffer;
  public ruolo: string[] = [];
  public file: any;
  public imgSrc: string;
  public selectedImage: any = null;
  @ViewChild('inputFile') inputFile: ElementRef;
  public schermoGrande: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private playerRef: PlayerService,
    private router: Router,
    private afStorage: AngularFireStorage,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.ruolo = ['Portiere', 'Difensore', 'Centrocampista', 'Attaccante'];
    this.onOrientationChange(null);
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

  creaGiocatore() {
    this.player.id = this.playerRef.getPlayerId(this.player);
    if (this.selectedImage) {
      const words: string[] = this.selectedImage.name.split('.');
      const name = this.player.id + '.' + words[words.length - 1];
      const filePath = '/profilePicture/' + this.player.id + '/' + name;
      var storageRef = this.afStorage.ref('/profilePicture/' + this.player.id + '/' + name);
      var task = storageRef.put(this.selectedImage);
      this.afStorage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((url) => {
            this.player.foto = url;
            this.createGiocatore();
          })
        })
      ).subscribe();
    }
    else {
      this.createGiocatore();
    }
  }

  createGiocatore() {
    if (this.playerRef.createPlayer(this.player)) {
      console.log('Giocatore Creato');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Giocatore creato' });
      this.router.navigate(['home/dashboard']);
      this.azzera();
    }
    else {
      console.log('Errore, giocatore non creato');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Errore, giocatore non creato' });
    }
  }

  rimuoviFoto() {
    this.player.foto = undefined;
    this.selectedImage = undefined;
    this.imgSrc = undefined;
    this.inputFile.nativeElement.value = "";
  }

  azzera() {
    this.rimuoviFoto();
    this.player = new Player();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
  }

}
