import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  public display: boolean;
  public banner: boolean;
  public schermoGrande: boolean;

  constructor(private router: Router, public authService: AuthService, private messageService: MessageService) {

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

  ngOnInit(): void {
    this.banner = true;
    this.router.navigate(['home/dashboard']);
  }

  navigateLogin() {
    // this.router.navigate(['home/profile']);
  }

  backHome() {
    if (this.authService.isLoggedIn === true) {
      this.router.navigate(['home/dashboard']);
    }
    else {
      this.router.navigate(['home/login']);
    }
  }

  logout() {
    this.authService.signOut();
  }

  onConfirm() {
    this.messageService.clear();
  }

  onReject() {
    this.messageService.clear();
  }

  clear() {
    this.messageService.clear();
  }

  closeBanner() {
    this.banner = false;
  }
  openUrl() {
  }
}
