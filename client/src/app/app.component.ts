import {Component} from '@angular/core';
import {AppService} from './app.service';
import {saveAs} from 'file-saver';
import {ElectronService} from 'ngx-electron';
import { FileSystemService } from './file-system.service';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {
  title = 'app';

  constructor(private appService: AppService, private fileSystemService: FileSystemService ) {}

  onDownloadTextFile() {
    this.appService.getTextFile().subscribe(data => {
        this.fileSystemService.saveFile(data, 'txt', 'text/plain');
      }, err => {
        console.error(err);
      }, () => console.log('done getting text file'));
  }

  onDownloadZipFile() {
   this.appService.getZipFile().subscribe(data => {
    this.fileSystemService.saveFile(data, 'zip', 'application/zip');
      }, err => {
        console.error(err);
      }, () => console.log('done getting zip file'));
  }

  onDownloadPdfFile() {
    this.appService.getPdfFile().subscribe(data => {
      this.fileSystemService.saveFile(data, 'pdf', 'application/pdf');
       }, err => {
         console.error(err);
       }, () => console.log('done getting pdf file'));
   }
}
