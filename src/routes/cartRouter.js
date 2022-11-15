const express = require('express')
const chequeadorRolAdmin = require('../middlewares/isAdmin')
const Container = require('./Container')

chequeadorRolAdmin()

const routerCart = express.Router();

const cartContainer = new Container ('cart.txt')

routerCart.get('/', async (req, res) => {
    const cart = await cartContainer.getAll()
    res.send({status: "succes", payload: cart})
})

routerCart.get('/', async (req, res) =>{
    const cart = await cartContainer.getById(req.params.id)
    if(cart){
        res.send({status: "succes", payload: "cart"})
    }else{
        res.send({status: "error", message: "Cart not found"})
    }
    console.log(cart)
})

routerCart.post('/', async (req, res) =>{
    try{
        const { name, code, description, price, stock, thumbnail} = req.body
        const cart = {
            name, code, description, price, stock, thumbnail, timestamp: Date.now()
        }
        const newCart = await cartContainer.save(cart)
        res.status(201).json(newCart)
    }catch (err){
        console.log(err)
        res.json({message: `An error has ocurred`})
    }
})

routerCart.put('/', async (req, res) =>{
    const cartUpdated = await cartContainer.updateProduct(req.body)
    res.status(200).send({status: "succes", payload: cartUpdated})
})

routerCart.delete('/', async (req, res) =>{
    const deleteCart = await cartContainer.deleteById(req.params.id)
    res.status(200).send({status: "succes", deleteCart})
})

export default routerCart;