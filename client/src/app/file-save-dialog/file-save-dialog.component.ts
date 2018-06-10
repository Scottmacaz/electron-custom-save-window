import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-file-save',
  templateUrl: './file-save-dialog.component.html',
  styleUrls: ['./file-save-dialog.component.css']
})
export class FileSaveDialogComponent implements OnInit {
  fileType = '';
  drives = [];
  showOnlyUsbDrives = false;
  driveWindowContents = [];
  currentPath = '';

  filename = 'blah';
  constructor(
    public dialogRef: MatDialogRef<FileSaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private electronService: ElectronService) {
    this.fileType = data.fileType;
  }

  ngOnInit() {
    this.drives = this.electronService.ipcRenderer.sendSync('getdrives', this.showOnlyUsbDrives);
    console.log('Dialog got drives: ' + this.drives);
    this.driveWindowContents = this.drives.slice(0);
  }

  close(filename: string) {
    console.log('filename: ' + filename);
    this.dialogRef.close('AnyDataToReturnHere');
  }

  save() {
    console.log('save file: ' + this.filename);
  }

  retry() {
    this.drives = this.electronService.ipcRenderer.sendSync('getdrives', this.showOnlyUsbDrives);
  }

  getFiles(selectedItem) {
    if ( this.currentPath.length > 0 && !this.currentPath.endsWith('\\')) {
      this.currentPath = this.currentPath + '\\';
    }

    this.currentPath = this.currentPath + selectedItem;
    console.log('Getting files for: ' + this.currentPath);
    const files = this.electronService.ipcRenderer.sendSync('getfiles', this.currentPath);
    debugger;
    console.log('Here are the files in the ng app: ' + files);
    this.driveWindowContents = files.slice(0);
  }

  showAllDrivesChanged(e) {
    this.showOnlyUsbDrives = e.target.checked;
    this.drives = this.electronService.ipcRenderer.sendSync('getdrives', this.showOnlyUsbDrives);
    // for now when the user changes drive selection preferences reload the drives.
    this.driveWindowContents = this.drives.slice(0);
    this.currentPath = '';

  }
}
