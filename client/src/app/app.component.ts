import {Component} from '@angular/core';
import {AppService} from './app.service';
import {saveAs} from 'file-saver';
import {ElectronService} from 'ngx-electron';
import { FileSystemService } from './file-system.service';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {
  title = 'app';
  useElectronDialog = false;

  constructor(private appService: AppService, private fileSystemService: FileSystemService ) {}

  useElectronDialogChanged(e) {
    this.useElectronDialog = e.target.checked;
  }

  onDownloadTextFile() {
    this.appService.getTextFile().subscribe(data => {
        this.fileSystemService.saveFile(data, 'txt', 'text/plain', this.useElectronDialog);
      }, err => {
        console.error(err);
      }, () => console.log('done getting text file'));
  }

  onDownloadZipFile() {
   this.appService.getZipFile().subscribe(data => {
    this.fileSystemService.saveFile(data, 'zip', 'application/zip', this.useElectronDialog);
      }, err => {
        console.error(err);
      }, () => console.log('done getting zip file'));
  }

  onDownloadPdfFile() {
    this.appService.getPdfFile().subscribe(data => {
      this.fileSystemService.saveFile(data, 'pdf', 'application/pdf', this.useElectronDialog);
       }, err => {
         console.error(err);
       }, () => console.log('done getting pdf file'));
   }
}
