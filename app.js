// Import the Express library

// Create an instance of an Express app

// Define a port number for the server (e.g., 3000)

// Set up middleware for parsing incoming requests (optional depending on your needs):
// - Use middleware to parse URL-encoded data if handling form submissions
// - Use middleware to parse JSON data if handling JSON payloads

// Define a route for the root URL ('/') to handle GET requests
// - Send an HTML response or a JSON message when this route is accessed

// Define a route to handle POST requests for form submission (e.g., '/submit')
// - Extract data from the request body and respond with a confirmation message

// Start the server and listen on the specified port
// - Log a message to confirm the server is running and provide the URL



// create basic server using node js

const http = require('http')
const server = http.createServer(function (req, res) {
    console.log("req---", req.url);
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1> Starting node js</h1>')
    }
    else if (req.url === '/time') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>' + new Date().toLocaleString() + '</h1>')
    }
    else {
        res.writeHead(404, { 'Content-type': 'text/html' })
        res.end(`<h1>NOT FOUND</h1>`)
    }
})

server.listen(8082, () => {
    console.log('server started with node js')
})


// create basic server using express js

// const express = require('express')

// const app = express((req, res) => {
//     res.send(`<h1>Starting with express js</h1>`)
// })
// app.listen(8082,, () => {
//     console.log('server started with express js')
// })
