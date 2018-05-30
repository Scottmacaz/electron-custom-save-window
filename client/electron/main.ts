
// App currently only runs in development mode.  If deployed this article has a good section
// on setting up deployment to use a file and not the development URL:
// https://scotch.io/tutorials/build-a-music-player-with-angular-2-electron-i-setup-basics-concepts

import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

const {ipcMain} = require('electron') ;
require('electron-reload')(__dirname );

console.log('watching: ' + __dirname );


let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  // and load the index.html of the app.
  // mainWindow.loadURL(url.format({
  //     pathname: path.join(__dirname, '../index.html'),
  //     protocol: 'file:',
  //     slashes: true,
  // }));

  mainWindow.loadURL('http://localhost:4200');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('saveFile', (event, path) => {
  const {dialog} = require('electron');
  const fs = require('fs');

  dialog.showSaveDialog({ filters: [
    { name: 'text', extensions: ['txt'] }
   ]}, function (fileNames) {

     // fileNames is an array that contains all the selected
     if (fileNames === undefined){
        console.log('No file sent to save dialog');
        return;
        
     }
debugger;
      fs.writeFile(fileNames[0], 'This is the content', { flag: 'w' }, function (err) {
        if (err) {
          dialog.showErrorBox('Error', err);
          return;
        } else {
          dialog.showMessageBox({ message: 'The file has been saved! :-)',
          buttons: ['OK'] });
        }
      });

  });

  function readFile(filepath) {
     fs.readFile(filepath, 'utf-8', (err, data) => {

        if (err) {
           alert('An error ocurred reading the file :' + err.message)
           return;
        }

        // handle the file content
        event.sender.send('fileData', data);
     });
  }
});
