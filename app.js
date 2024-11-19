const express = require('express')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')


const port = 8082
const app = express()

console.log("__dirname---", __dirname);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'Hey', message: 'Hello there!' })
})

app.get('/confirm', (req, res) => {
    res.render('confirm', { title: 'Hey', message: 'Hello there!' })
})

app.get('/recommend', (req, res) => {
    res.render('recommend', { title: 'Hey', message: 'Hello there!' })
})

app.get('/restaurants', (req, res) => {
    res.render('restaurants', { title: 'Hey', message: 'Hello there!' })
})
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
