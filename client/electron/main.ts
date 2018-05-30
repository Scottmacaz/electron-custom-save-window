// App currently only runs in development mode.  If deployed this article has a good section
// on setting up deployment to use a file and not the development URL:
// https://scotch.io/tutorials/build-a-music-player-with-angular-2-electron-i-setup-basics-concepts

import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

const { ipcMain } = require("electron");
require("electron-reload")(__dirname);

console.log("watching: " + __dirname);

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  });

  // and load the index.html of the app.
  // mainWindow.loadURL(url.format({
  //     pathname: path.join(__dirname, '../index.html'),
  //     protocol: 'file:',
  //     slashes: true,
  // }));

  mainWindow.loadURL("http://localhost:4200");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
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
ipcMain.on('saveFile', (event, fileName, fileExtenstion, fileContents) => {
  const { dialog } = require('electron');
  const fs = require('fs');
  const savePath = dialog.showSaveDialog({
    filters: [
      {
        name: fileName,
        extensions: [fileExtenstion]
      }
    ],
    defaultPath: 'C:\\t2\\' + fileName
  });

  if (savePath === undefined) {
    return event.returnValue = 'canceled';
  }

  fs.writeFile(savePath, fileContents, function(err) {
    if (err) {
      alert(`Error saving file!!! ${err}`);
      return event.returnValue = 'fail';
    } else {
      return event.returnValue = 'success';
    }
  });
});
