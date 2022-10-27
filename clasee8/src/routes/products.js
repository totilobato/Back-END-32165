const express = require('express')
const MemoryContainer = require('../memoryContainer')
const router = express.Router()

const productsContainer = new MemoryContainer()

router.get('/api/products', (_req, res) =>{
    const products = productsContainer.getAll()
    res.status(201).send({status: "success", payload: products})
})

router.get('/api/products/:id', (req, res) =>{
    const product = productsContainer.getById(req.params.id)
    if(product){
        res.send({status: "success", payload: product})
    }else{
        res.send({status: "error", message: "Product not found"})
    }
})

router.post('/api/products'), (req, res) =>{
    const product = productsContainer.updateProduct(req.params.id, req.body)
    res.send({status: "succes", payload: product})
}

router.delete('/api/products/:id'), (req,res) => {
    const product = productsContainer.deleteById(req.params.id)
    res.send({status: "succes", payload: product})
}