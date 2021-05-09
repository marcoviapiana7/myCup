
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthModule } from '../authComponents/auth.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { ModifyPlayerComponent } from './modify-player/modify-player.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ModifyPlayerDialogComponent } from './modify-player-dialog/modify-player-dialog.component';

@NgModule({
  declarations: [
    CreatePlayerComponent,
    ModifyPlayerComponent,
    ModifyPlayerDialogComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    RouterModule,
    FormsModule,
    SidebarModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputNumberModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    DropdownModule,
    PasswordModule,
    DialogModule,
    InputTextModule,
    AuthModule,
    CardModule,
    SplitButtonModule
  ],
  exports: [
    CreatePlayerComponent,
    ModifyPlayerComponent,
    ModifyPlayerDialogComponent
  ]
})
export class PlayerModule { }
