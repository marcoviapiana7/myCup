
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthModule } from '../authComponents/auth.module';
import { CupModule } from '../cup/cup.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SidebarModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    ToolbarModule,
    PasswordModule,
    InputTextModule,
    AuthModule,
    CupModule,
    CardModule,
    SplitButtonModule,
  ],
  exports: [
    DashboardComponent
  ],
})
export class UserModule { }
