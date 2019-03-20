const CONFIG = require('./config/config.json')
const router = require('./controllers/main')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// Register '.mustache' extension with The Mustache Express
const express = require('express')

const app = express()
const path = require('path')

/* SERVER SETUP */
app.engine('html', mustacheExpress());
app.set('port', process.env.PORT || CONFIG.PORT)
app.set('views', path.join(__dirname, CONFIG.DIR_VIEWS))
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, CONFIG.DIR_PUBLIC)))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

/* ROUTES FROM CONTROLLERS */
app.use(router)

/* SERVER START */
app.listen(app.get('port'), () => {
    let now = new Date()
    console.log("[" + now.toLocaleString() + "] " + "Server has started on port " + app.get('port'))
})

process.on('exit', () => {
    let now = new Date()
    console.log("[" + now.toLocaleString() + "] " + 'Server is shutting down.')
})

process.on('SIGINT', () => {
    let now = new Date()
    console.log("[" + now.toLocaleString() + "] " + 'Server was forcefully shutdown.')
    process.exit(1)
})
