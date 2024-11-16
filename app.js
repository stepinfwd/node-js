const express = require('express')
const port = 8082
const app = express()

app.get('/', function (req, res) {
    res.send('Basic server')
})
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
