import { CupService } from './../../../services/cup.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cup } from 'src/app/models/cup.models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'create-cup-dialog',
  templateUrl: './create-cup-dialog.component.html',
  styleUrls: ['./create-cup-dialog.component.scss']
})
export class CreateCupDialogComponent implements OnInit {
  public showed: boolean;
  public torneo: Cup = new Cup();
  @Output() cupEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private cupService: CupService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.showed = true;
  }

  closeDialog() {
    this.showed = false;
    this.cupEmitter.emit(this.showed);
  }

  creaTorneo() {
    this.torneo.partite = [];
    if (this.cupService.addCup(this.torneo)) {
      this.closeDialog();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Torneo creato' });
      console.log('Campionato creato')
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Errore, torneo non creato' });
      console.log('Errore nella creazione del campionato');
    }
  }

}
