import { Component } from '@angular/core';
import { AppService } from './app.service';
import {saveAs} from 'file-saver';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private appService: AppService,
    private electronService: ElectronService) {

  }
  onDownloadFile() {
    console.log('Download!');
    // const blob = new Blob(['Hello, world!'], {type: 'text/plain;charset=utf-8'});
    // saveAs(blob, 'hello world.txt');

    this.appService.getFile().subscribe(
            data => {
              debugger;
              this.saveToFileSystem(data);
            },
            err => {
              debugger;
              console.error(err);
            },
            () => console.log('done loading foods')
          );
  }

  private saveToFileSystem(response) {
    debugger;
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    let filename = parts[1].split('=')[1];
    filename = filename.replace(/"/g, '');
    const blob = new Blob([response.body], { type: 'text/plain' });
    if (this.electronService.isElectronApp) {
      console.log('Electron app!');
      this.electronService.ipcRenderer.send('saveFile', () => {
        console.log('Event sent.');
     });
    } else {
      console.log ('web page app!');
      saveAs(blob, filename);
    }

  }
}
