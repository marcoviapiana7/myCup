import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public display: boolean;
  public playerItems: MenuItem[];
  public cupItems: MenuItem[];
  public matchItems: MenuItem[];
  public creaTorneo: boolean;
  public modifyTorneo: boolean;

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.modifyTorneo = false;
    this.playerItems = [
      {
        label: 'Crea', icon: 'pi pi-user-plus', command: () => {
          this.router.navigate(['home/create-player']);
        }
      },
      {
        label: 'Modifica', icon: 'pi pi-user-minus', command: () => {
          this.router.navigate(['home/modify-player']);
        }
      }
    ];

    this.cupItems = [
      {
        label: 'Crea Torneo', icon: 'pi pi-plus', command: () => {
          this.creaTorneo = true;
        }
      },
      {
        label: 'Modifica Torneo', icon: 'pi pi-pencil', command: () => {
          this.modifyTorneo = true;
        }
      },
    ];
    this.matchItems = [
      {
        label: 'Crea', icon: 'pi pi-plus', command: () => {
          this.router.navigate(['home/create-match']);
        }
      },
      {
        label: 'Modifica', icon: 'pi pi-pencil', command: () => {
          this.router.navigate(['home/show-matches']);
        }
      },
    ];
    this.creaTorneo = false;
  }

  backHome() {
    this.router.navigate(['home']);
  }

  logout() {
    this.authService.signOut();
  }

  naviga(event: any) {
    this.router.navigate(['home/' + event])
  }
}
