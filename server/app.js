const express = require('express')
const cors = require('cors')

const app = express()

// var usbDetect = require('usb-detection');
// usbDetect.find().then(function(devices) {
//    console.log(devices); 
//    // Looking for this in devices: deviceName: 'USB Mass Storage Device',
//    const usbDevices
//   debugger;
//   }).catch(function(err) { console.log(err); });

// for npm install drivelist to work run this from a powershell window as admin
// npm --add-python-to-path='true' --debug install --global windows-build-tools
const drivelist = require('drivelist');

drivelist.list((error, drives) => {
  if (error) {
    throw error;
  }

  drives.forEach((drive) => {
    console.log(drive);
  });
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  next();
});

app.get('/textfile', (req, res) => {
  res.download("./download-files/text-file.txt", "textFile.txt");
})

app.get('/pdffile', (req, res) => {
  res.download("./download-files/CathederalAndBazaar.pdf", "cathederal-and-bazaar.pdf");
})

app.get('/zipfile', (req, res) => {
  res.download("./download-files/zip-file.zip", "zipFilie.zip");
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))