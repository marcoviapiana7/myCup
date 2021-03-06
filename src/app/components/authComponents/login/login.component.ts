import { UserLogIn } from '../../../models/utente.model';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public display: boolean;
  public password: string;
  public email: string;
  public register: boolean;
  public memorize: boolean = false;;
  @Output() loginEvent = new EventEmitter<UserLogIn>();

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (window.localStorage.getItem("user") && window.localStorage.getItem("password")) {
      this.memorize = true;
      this.email = window.localStorage.user;
      this.password = window.localStorage.getItem("password");
    }
  }

  navigateRegister() {
    this.router.navigate(['home/register'])
  }

  lostPassword() {
    this.router.navigate(['home/forgot-password'])
  }

  login() {
    this.authService.signIn(this.email, this.password, this.memorize)
  }
}
