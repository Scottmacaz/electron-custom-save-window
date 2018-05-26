const express = require('express')
const cors = require('cors')

const app = express()

// app.use(cors());
// app.options('*', cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  next();
});

app.get('/file', (req, res) => {
  res.download("./text-file.txt", "textFile.txt");
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))