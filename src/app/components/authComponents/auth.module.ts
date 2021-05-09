import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { LoginComponent } from './login/login.component';
import { DialogModule } from 'primeng/dialog';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';



@NgModule({
  declarations: [
    ForgotPasswordComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SidebarModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    ToolbarModule,
    PasswordModule,
    InputTextModule,
    DialogModule
  ],
  exports: [
    ForgotPasswordComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
  ]
})
export class AuthModule { }
