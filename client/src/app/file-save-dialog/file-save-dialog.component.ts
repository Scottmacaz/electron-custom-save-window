import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElectronService } from 'ngx-electron';
import { FileDetail } from './file-detail';

@Component({
  selector: 'app-file-save',
  templateUrl: './file-save-dialog.component.html',
  styleUrls: ['./file-save-dialog.component.css']
})
export class FileSaveDialogComponent implements OnInit {
  fileType = '';

  showOnlyUsbDrives = false;
  fileDetails: Array<FileDetail> = [];
  currentPath = '';

  filename = 'blah';
  constructor(
    public dialogRef: MatDialogRef<FileSaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private electronService: ElectronService) {
    this.fileType = data.fileType;
  }

  ngOnInit() {
    this.setUsbDrives();
  }

  close(filename: string) {
    console.log('filename: ' + filename);
    this.dialogRef.close('AnyDataToReturnHere');
  }

  save() {
    console.log('save file: ' + this.filename);
  }

  retry() {
    // this.drives = this.electronService.ipcRenderer.sendSync('getdrives', this.showOnlyUsbDrives);
  }

  getFiles(selectedFile) {
    if ( this.currentPath.length > 0 && !this.currentPath.endsWith('\\')) {
      this.currentPath = this.currentPath + '\\';
    }
    this.currentPath = this.currentPath + selectedFile.fileName;
    console.log('Getting files for: ' + this.currentPath);
    debugger;
    const getFileResponse = this.electronService.ipcRenderer.sendSync('getfiles', this.currentPath);
    debugger;
    this.fileDetails = new Array<FileDetail>();
    getFileResponse.files.forEach(file => {
      this.fileDetails.push(new FileDetail(file.file, file.isDir, file.isDir ? 'fa fa-folder' : 'fa fa-file'));
    });
  }

  showAllDrivesChanged(e) {
    this.showOnlyUsbDrives = e.target.checked;
    this.setUsbDrives();
  }

  setUsbDrives() {
    this.fileDetails = new Array<FileDetail>();
    this.currentPath = '';
    const drives = this.electronService.ipcRenderer.sendSync('getdrives', this.showOnlyUsbDrives);
    console.log('Dialog got drives: ' + drives);
    drives.forEach((drive) => {
      this.fileDetails.push(new FileDetail(drive.driveLetter, true, drive.isUsb ? 'fa fa-usb' : ''));
    });
  }
}
