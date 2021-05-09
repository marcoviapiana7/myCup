import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'select-player-dialog',
  templateUrl: './select-player-dialog.component.html',
  styleUrls: ['./select-player-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectPlayerDialogComponent implements OnInit {
  public showed: boolean;
  @Input() players: Player[];
  @Input() selectedPlayers: Player[];
  @Input() avversari: Player[];
  public playersToShow: Player[] = [];
  public schermoGrande: boolean;
  @Output() notifyPlayer = new EventEmitter<Player[]>();

  constructor(
  ) { }

  ngOnInit(): void {
    this.players.forEach(player => {
      if (!this.avversari.includes(player)) {
        this.playersToShow.push(player);
      }
    })
    this.onOrientationChange(null);
    this.showed = true;
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


  closeDialog() {
    this.showed = false;
    this.notifyPlayer.emit(this.selectedPlayers);
  }

}
