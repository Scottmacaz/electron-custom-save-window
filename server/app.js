const express = require('express')
const cors = require('cors')

const app = express()

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