import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  constructor(private router: Router, public authService: AuthService, private messageService: MessageService) {

  }

  ngOnInit(): void {
  }

  navigateLogin() {
    if (this.authService.isLoggedIn === true) {
      this.router.navigate(['home/dashboard']);
    }
    else {
      this.router.navigate(['home/login']);
    }
  }

  backHome() {
    this.router.navigate(['home']);
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
}
