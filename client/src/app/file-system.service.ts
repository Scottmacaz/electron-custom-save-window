import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {saveAs} from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private electronService: ElectronService) {}

  saveFile(response, fileExtension, type) {
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
