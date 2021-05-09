import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectPlayerDialogComponent } from './components/select-player/select-player-dialog.component';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
    declarations: [
        SelectPlayerDialogComponent,
    ],
    imports: [
        CommonModule,
        ButtonModule,
        BrowserModule,
        DialogModule,
        TableModule,
        AvatarModule
    ],
    exports: [
        SelectPlayerDialogComponent,
    ]

})
export class DialogComponentsModule { }
