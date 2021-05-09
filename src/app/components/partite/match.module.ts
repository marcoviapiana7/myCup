import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMatchComponent } from './create-match/create-match.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthModule } from '../authComponents/auth.module';
import { CalendarModule } from 'primeng/calendar';
import { PickListModule } from 'primeng/picklist';
import { DialogComponentsModule } from 'src/app/modules/dialog-module/dialog-components.module';
import { ModifyMatchComponent } from './modify-match/modify-match.component';
import { ShowMatchesComponent } from './show-matches/show-matches.component';


@NgModule({
  declarations: [
    CreateMatchComponent,
    ModifyMatchComponent,
    ShowMatchesComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    RouterModule,
    FormsModule,
    SidebarModule,
    BrowserModule,
    HttpClientModule,
    CalendarModule,
    BrowserAnimationsModule,
    InputNumberModule,
    TableModule,
    PickListModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogComponentsModule,
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
    CreateMatchComponent,
    ModifyMatchComponent,
    ShowMatchesComponent
  ]
})
export class MatchModule { }
