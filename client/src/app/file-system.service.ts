import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { saveAs } from 'file-saver';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FileSaveDialogComponent } from './file-save-dialog/file-save-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  constructor(
    private electronService: ElectronService,
    private dialog: MatDialog
  ) {}

  saveFile(response, fileExtension, type, useElectronDialog) {
    const contentDispositionHeader: string = response.headers.get(
      'Content-Disposition'
    );
    const parts: string[] = contentDispositionHeader.split(';');
    let filename = parts[1].split('=')[1];
    filename = filename.replace(/"/g, '');
    if (this.electronService.isElectronApp) {
      if (useElectronDialog) {
        const electronResponse = this.electronService.ipcRenderer.sendSync(
          'saveFile',
          filename,
          fileExtension,
          new Buffer(response.body)
        );
        console.log(`Electron Response: [${electronResponse}]`);

      } else {

       this.dialog.open(FileSaveDialogComponent, {
          height: '600px',
          width: '600px',
          autoFocus: true,
          disableClose: true,
          data: {
            fileType: fileExtension
          }
        });
      }
    } else {
      const blob = new Blob([response.body], { type: type });
      console.log('web page app!');
      saveAs(blob, filename);
    }
  }
}
