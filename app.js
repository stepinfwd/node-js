const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send(`<form action='/store-user' method='POST'><label> Enter your name:</label><input name='username'></input><button type='submit'>Submit</button></form>`)

})
app.post('/store-user', (req, res) => {
    const directory = path.join(__dirname, 'users.json');
    const users = JSON.parse(fs.readFileSync(directory))
    users.push(req.body.username)
    fs.writeFileSync(directory, JSON.stringify(users))
    res.send('Username saved')
})

app.get('/users', (req, res) => {
    const directory = path.join(__dirname, 'users.json');
    const users = JSON.parse(fs.readFileSync(directory))
    let responseData = '<ul>';

    for (const user of users) {
        responseData += '<li>' + user + '</li>';
    }

    responseData += '</ul>';
    res.send(responseData);
})


app.listen(8082)

