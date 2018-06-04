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
  showAllDrives = false;
  constructor(
    public dialogRef: MatDialogRef<SaveToUsbComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private electronService: ElectronService  ) {
    this.fileType = data.fileType;
  }

  ngOnInit() {
    this.drives = this.electronService.ipcRenderer.sendSync('getdrives', false);
    console.log('Dialog got drives: ' + this.drives);
  }

  close() {
    this.dialogRef.close('AnyDataToReturnHere');
  }

  getDriveContents(drive) {
    console.log('Getting drive contents for: ' + drive);
  }

  showAllDrivesChanged(e) {
    debugger;
    console.log('e.isChecked: ' + e.target.checked);
    this.showAllDrives = e.target.checked;
  }
}
