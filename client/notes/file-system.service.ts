// import {Injectable} from '@angular/core';
// import {ElectronService} from 'ngx-electron';
// import {saveAs} from 'file-saver';

// @Injectable()
// export class FileSystemService {

//   constructor(private electronService : ElectronService) {}
//   saveFile(responseBody : any, fileName : string, dialogTitle : string, defaultPath : string, fileExtension : string, fileType: string) {
//     if (this.electronService.isElectronApp) {
//       var byteArray = new Uint8Array(responseBody);
//       var buffer = new Buffer(byteArray.length);
//       for (var i = 0; i < byteArray.length; i++) {

//           buffer.writeUInt8(byteArray[i], i);
//       }

//       let response = this.electronService.ipcRenderer.sendSync('save-file', byteArray, fileName, dialogTitle, defaultPath, fileExtension);
//       return {
//           "hasError": false,
//           "error": ""
//       };
//       /////

//     } else {

//       const blob = new Blob([responseBody], { type: fileType });
//       saveAs(blob, `${fileName}.${fileExtension}`);

//       return {
//           "hasError": false,
//           "error": ""
//       };

//     }
//   }
// }