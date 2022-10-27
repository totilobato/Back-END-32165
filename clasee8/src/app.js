const express = require('express')
const app = express()
const routes = require('./routes/products')

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/public', express.static(`${__dirname}/public`))

app.use('/', routes)

app.listen(8080, () =>{
    console.log('Server listening on port: 8080')
})