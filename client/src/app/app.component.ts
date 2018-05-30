import {Component} from '@angular/core';
import {AppService} from './app.service';
import {saveAs} from 'file-saver';
import {ElectronService} from 'ngx-electron';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {
  title = 'app';

  constructor(private appService: AppService, private electronService: ElectronService) {}
  onDownloadTextFile() {
    // const blob = new Blob(['Hello, world!'], {type: 'text/plain;charset=utf-8'});
    // saveAs(blob, 'hello world.txt');

    this
      .appService.getTextFile().subscribe(data => {
        this.saveToFileSystem(data, 'txt', 'text/plain');
      }, err => {
        console.error(err);
      }, () => console.log('done getting text file'));
  }

  onDownloadZipFile() {
   this.appService.getZipFile().subscribe(data => {
        this.saveToFileSystem(data, 'zip', 'application/zip');
      }, err => {
        console.error(err);
      }, () => console.log('done getting zip file'));
  }

  onDownloadPdfFile() {
    this.appService.getPdfFile().subscribe(data => {
         this.saveToFileSystem(data, 'pdf', 'application/pdf');
       }, err => {
         console.error(err);
       }, () => console.log('done getting pdf file'));
   }

  private saveToFileSystem(response, fileExtension, type) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    let filename = parts[1].split('=')[1];
    filename = filename.replace(/"/g, '');
    if (this.electronService.isElectronApp) {
      console.log('Electron app!');
      const electronResponse = this.electronService.ipcRenderer.sendSync('saveFile', filename, fileExtension, new Buffer(response.body));
      console.log(`Electron Response: [${electronResponse}]`);
    } else {
      const blob = new Blob([response.body], {type: type});
      console.log('web page app!');
      saveAs(blob, filename);
    }
  }
}
