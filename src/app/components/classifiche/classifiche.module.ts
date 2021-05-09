import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { DialogComponentsModule } from 'src/app/modules/dialog-module/dialog-components.module';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreaClassificaComponent } from './crea-classifica/crea-classifica.component';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AuthModule } from '../authComponents/auth.module';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { IonicRouteStrategy } from '@ionic/angular';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';


@NgModule({
  declarations: [
    CreaClassificaComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    DropdownModule,
    DialogComponentsModule,
    RouterModule,
    SidebarModule,
    HttpClientModule,
    InputNumberModule,
    ReactiveFormsModule,
    FileUploadModule,
    PasswordModule,
    DialogModule,
    InputTextModule,
    AuthModule,
    CardModule,
    SplitButtonModule
  ],
  providers: [
    PreviewAnyFile,
    File,
    FileOpener,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    DocumentViewer,
  ],
  exports: [CreaClassificaComponent]
})
export class ClassificheModule { }
