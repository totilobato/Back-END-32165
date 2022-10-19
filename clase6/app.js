const Container = require('./container')
const express = require('express');
const app = express();
const PORT = 8000;
const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

const product = new Container ('products.txt')
console.log(product)

app.get('/api/products', async (_req, res) => {
    const products = await products.getAll()
    res.send(products)
    console.log('products')
})

app.get('/api/randomproduct', async (_req, res) =>{
    const products = await product.getAll()
    const randomIndex = randomProduct (1, products.length)
    function randomProduct (min, max){
        return Math.floor(Math.random()*((max+1)-min)+min);
    }
    res.send(products[randomIndex])
})