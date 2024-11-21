const express = require('express')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')


const port = 8082
const app = express()

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


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

app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    console.log("id---", id);
    res.render('restaurant-details', { restaurantId: id, message: 'Hello there!' })
})

app.get('/restaurants', (req, res) => {
    // const restaurants = req.body
    const filePath = path.join(__dirname, 'data', 'restaurants.json')
    const data = JSON.parse(fs.readFileSync(filePath))
    res.render('restaurants', { restaurants: data, numberOfRestaurants: data.length })
})

app.post('/recommend', (req, res) => {
    const restaurants = req.body
    const filePath = path.join(__dirname, 'data', 'restaurants.json')
    const data = JSON.parse(fs.readFileSync(filePath))
    data.push(restaurants)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.redirect('confirm')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
