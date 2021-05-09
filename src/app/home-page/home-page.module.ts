import { IonicModule } from '@ionic/angular';
import { ClassificheModule } from './../components/classifiche/classifiche.module';
import { HomePageComponent } from './home-page.component';
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
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../components/authComponents/auth.module';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton'
import { UserModule } from '../components/user/user.module';
import { PlayerModule } from '../components/players/player.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CupModule } from '../components/cup/cup.module';
import { MatchModule } from '../components/partite/match.module';
import { DialogComponentsModule } from '../modules/dialog-module/dialog-components.module';

@NgModule({
  declarations: [
    HomePageComponent
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
    CupModule,
    ToolbarModule,
    PasswordModule,
    InputTextModule,
    IonicModule.forRoot(),
    DialogComponentsModule,
    ToastModule,
    AuthModule,
    CardModule,
    ClassificheModule,
    MatchModule,
    PlayerModule,
    IonicModule,
    SplitButtonModule,
    UserModule,
  ],
  exports: [
    HomePageComponent,
  ],
  providers: [AuthService, MessageService]
})
export class HomePageModule { }
