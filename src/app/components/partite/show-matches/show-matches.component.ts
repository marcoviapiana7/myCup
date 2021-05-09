import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ChiaveValoreDropdown } from 'src/app/models/ChiaveValoreDropdown.models';
import { Match } from 'src/app/models/match.models';
import { CupService } from 'src/app/services/cup.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'show-matches',
  templateUrl: './show-matches.component.html',
  styleUrls: ['./show-matches.component.scss']
})
export class ShowMatchesComponent implements OnInit {
  public schermoGrande: boolean;
  public selectedMatches: Match[];
  public matches: Match[] = [];
  public modifyMatchesDialog: boolean;
  public torneo: ChiaveValoreDropdown;
  public tornei: string[] = [];
  public torneiDropdown: ChiaveValoreDropdown[] = [];
  public matchModify: Match;
  public showed: boolean;

  constructor(private matchService: MatchService, private cupService: CupService, private router: Router) { }

  ngOnInit(): void {
    this.onOrientationChange(null);
    this.getTornei();
    this.modifyMatchesDialog = false;
    this.selectedMatches = [];
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


  getAllMatches() {
    this.matchService.getMatches(this.torneo.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.matches = data;
    });
  }

  deleteSelectedMatch() {
    this.selectedMatches.forEach(match => {
      this.matchService.deleteMatch(match.id, this.torneo.value);
    })

  }

  createMatch() {
    this.router.navigate(['home/create-match'])
  }

  editMatch(match: Match) {
    this.matchModify = match;
    this.showed = true;
  }

  deleteMatch(match: Match) {
    this.matchService.deleteMatch(match.id, this.torneo.value);
  }

  getData(dataString: string) {

    var dateParts = dataString.split("/");

    if (dateParts[2].length === 1) {
      dateParts[2] = '0' + dateParts[2];
    }
    if (dateParts[1].length === 1) {
      dateParts[1] = '0' + dateParts[1];
    }


    const x = dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2];
    return new Date(x);
  }


}
