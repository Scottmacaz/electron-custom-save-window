import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {saveAs} from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private electronService: ElectronService) {}
  saveFile(responseBody: any, fileName: string, dialogTitle: string, defaultPath: string, fileExtension: string, fileType: string) {
    if (this.electronService.isElectronApp) {
      const byteArray = new Uint8Array(responseBody);
      const buffer = new Buffer(byteArray.length);
      for (let i = 0; i < byteArray.length; i++) {
          buffer.writeUInt8(byteArray[i], i);
      }

      const response = this.electronService.ipcRenderer.sendSync('save-file', byteArray, fileName, dialogTitle, defaultPath, fileExtension);
      return {
          'hasError': false,
          'error': ''
      };
      /////

    } else {

      const blob = new Blob([responseBody], { type: fileType });
      saveAs(blob, `${fileName}.${fileExtension}`);

      return {
          'hasError': false,
          'error': ''
      };

    }
  }
}
