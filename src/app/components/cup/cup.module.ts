import { ModifyCupComponent } from './modify-cup/modify-cup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCupDialogComponent } from './create-cup-dialog/create-cup-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
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



@NgModule({
  declarations: [
    CreateCupDialogComponent,
    ModifyCupComponent
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
    CreateCupDialogComponent,
    ModifyCupComponent
  ],
  providers: []
})
export class CupModule { }
