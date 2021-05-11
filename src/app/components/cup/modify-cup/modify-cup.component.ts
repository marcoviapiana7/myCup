import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { ChiaveValoreDropdown } from 'src/app/models/ChiaveValoreDropdown.models';
import { Cup } from 'src/app/models/cup.models';
import { Match } from 'src/app/models/match.models';
import { CupService } from 'src/app/services/cup.service';

@Component({
  selector: 'modify-cup',
  templateUrl: './modify-cup.component.html',
  styleUrls: ['./modify-cup.component.scss'],
})
export class ModifyCupComponent implements OnInit {
  public matches: Match[] = [];
  public tornei: Cup[];
  public newName: string;
  @Output() modifyCupEmitter = new EventEmitter<boolean>();

  constructor(private cupService: CupService) { }

  ngOnInit() {
    this.getTornei();
  }

  getTornei() {
    this.cupService.getCups().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tornei = data;
    });
  }

  onRowEditSave(torneo: Cup) {
    let cupNuovo = new Cup();
    cupNuovo.nome = this.newName;
    this.cupService.updateCup(torneo, cupNuovo);
    this.newName = '';
  }

  onRowEditCancel() {
    this.newName = '';
  }

  back() {
    this.modifyCupEmitter.emit(true);
  }

}
