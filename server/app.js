const express = require('express')
const app = express()

app.get('/file', (req, res) => {
  res.download("./text-file.txt", "textFile.txt");
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))