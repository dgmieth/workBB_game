//node modules
const fs = require('fs')
const https = require('https')
const path = require('path')
//npm modules
const express = require('express')
const session = require('express-session')
//application classes
const Funci = require('../model/classes/funcis')
//application routers
const pageRouter = require('./router/pageRouter')
const serviceRouter = require('./router/serviceRouter')
//other modules
const validador = require('./validador/validador')
//server certificates and ports
const portHttp = 4020
const portHttps = 4021
const credentials = {
    key: fs.readFileSync(__dirname + '/certificates/key.pem','utf-8'),
    cert: fs.readFileSync(__dirname + '/certificates/server.crt','utf-8')
}
//other variables
const store = new session.MemoryStore()
//app creation & configuration
var app = express()
app.set('view engine','ejs')
app.set('views',path.join(__dirname, '../views'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(session({
    secret: "reconheserGS",
    name: "reconheserGS",
    resave: true,
    saveUninitialized: false,
    store: store
}))
app.use(express.urlencoded())
app.use(express.json({limit: '50mb'}))
app.use(validador.validaToken)

//app routes
app.use('/services', serviceRouter)
app.use(pageRouter)
//server creation
https.createServer(credentials,app).listen(portHttps)

