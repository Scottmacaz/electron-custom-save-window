import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { SaveToUsbComponent } from './save-to-usb/save-to-usb.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SaveToUsbComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxElectronModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SaveToUsbComponent]
})
export class AppModule { }
