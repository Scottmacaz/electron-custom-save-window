import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-save-to-usb',
  templateUrl: './save-to-usb.component.html',
  styleUrls: ['./save-to-usb.component.css']
})
export class SaveToUsbComponent implements OnInit {
  fileType = '';
  drives = [];
  showOnlyUsbDrives = false;
  constructor(
    public dialogRef: MatDialogRef<SaveToUsbComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private electronService: ElectronService  ) {
    this.fileType = data.fileType;
  }

  ngOnInit() {
    this.drives = this.electronService.ipcRenderer.sendSync('getdrives', this.showOnlyUsbDrives);
    console.log('Dialog got drives: ' + this.drives);
  }

  close() {
    this.dialogRef.close('AnyDataToReturnHere');
  }

  retry() {
    this.drives = this.electronService.ipcRenderer.sendSync('getdrives', this.showOnlyUsbDrives);
  }

  getDriveContents(drive) {
    console.log('Getting drive contents for: ' + drive);
  }

  showAllDrivesChanged(e) {
    this.showOnlyUsbDrives = e.target.checked;
      this.drives = this.electronService.ipcRenderer.sendSync('getdrives', this.showOnlyUsbDrives);
  }
}
