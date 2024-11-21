const express = require('express')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const { v4: uuidv4 } = require('uuid');


const port = 8082
const app = express()

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/confirm', (req, res) => {
    res.render('confirm')
})

app.get('/recommend', (req, res) => {
    res.render('recommend')
})

app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    const filePath = path.join(__dirname, 'data', 'restaurants.json')
    const restaurants = JSON.parse(fs.readFileSync(filePath))

    for (restaurant of restaurants) {
        if (restaurant.id == id)
            return res.render('restaurant-details', { restaurantId: id, restaurant: restaurant })
    }
    res.status(404).render('404');
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
    restaurants.id = uuidv4()
    data.push(restaurants)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.redirect('confirm')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404');
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack); // Log the error stack for debugging
    res.status(err.status || 500).render('500', {
        title: '500 - Internal Server Error',
        message: 'Something went wrong!'
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
