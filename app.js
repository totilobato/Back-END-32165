require('dotenv').config()
const express = require('express')

const app = express()
const logger = require('morgan')
const router = require('')
const cartRouter = require('./src/routes/cartRouter')
const productsRouter = require('./src/routes/productsRouter')
const errorHandler = require('./src/middlewares/errorHandler')
const isAdmin = require('./src/middlewares/isAdmin')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/products', routerProducts)
app.use('/api/cart', routerCart)

app.get('/', async(_req, res) => {
    res.status(200).json({
        enviroment: process.env.NODE_ENV || undefined,
        port: process.env.PORT || 8080
    })
})

app.use(logger('dev'))
app.use('/api', router)
app.use(errorHandler)
app.use(isAdmin())

module.exports = app