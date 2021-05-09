import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogIn, Utente } from 'src/app/models/utente.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user: UserLogIn = new UserLogIn();
  public registrationForm: FormGroup;
  public passwordMatch: string;
  public showed: boolean;


  @Output() dialogEvent = new EventEmitter<UserLogIn | boolean>();

  constructor(private _fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registrationForm = this._fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      user: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?.&])[A-Za-z\d$@$!%*?.&].{8,}")]],
      cellulare: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
  }

  closeDialog() {
  }

  get f() {
    return this.registrationForm.controls;
  }

  confermaRegistrazione() {
    const utente: Utente = new Utente();
    utente.displayName = this.user.nome + ' ' + this.user.cognome;
    utente.email = this.user.email;
    utente.uid = this.user.user;
    utente.phoneNumber = this.user.cellulare;
    utente.photoURL = this.user.foto;
    this.authService.signUp(this.user.email, this.user.password, utente);
  }

}
