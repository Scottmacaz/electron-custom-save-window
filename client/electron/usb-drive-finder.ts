// var usbDetect = require('usb-detection');
// usbDetect.find().then(function(devices) {    console.log(devices);    //
// Looking for this in devices: deviceName: 'USB Mass Storage Device',    const
// usbDevices   debugger;   }).catch(function(err) { console.log(err); }); for
// npm install drivelist to work run this from a powershell window as admin npm
// --add-python-to-path='true' --debug install --global windows-build-tools
//
// When running in electron the drivelist has an issue loading.  Use this
// command to rebuild native modules if there are dynamic dll loading issues:
// ./node_modules/.bin/electron-rebuild See this:
// https://github.com/electron/electron/blob/v0.37.2/docs/tutorial/using-native-n
// ode-modules.md#using-native-node-modules
// https://nodeschool.io/#workshoppers 

const drivelist = require('drivelist');

let usbDriveFinder = {
  findDrives: function (cb) {
    console.log('Finding Drives!!!!!');
    drivelist.list((error, drives) => {
      if (error) {
        throw error;
      }

      drives.forEach((drive) => {
        console.log(drive);
      });
      const removableDrives = drives.filter(x => x.isRemovable === true);
      const removableDriveLetters = [];

      removableDrives.forEach(function (drive) {
        removableDriveLetters.push(drive.mountpoints[0].path);
      });
      console.log(removableDriveLetters);
      cb(null, removableDriveLetters);
    });
  }
};

module.exports = usbDriveFinder;
