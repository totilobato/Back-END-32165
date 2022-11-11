const Container = require('./Container.js')
let products = new Container('products.txt')

module.exports = products

let test = async() => {
    try {
        let products = await new Container('products.txt')
        let product1 = await products.save({
            title: 'Escuadra',                     
            price: 123.45,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
        })
        let product2 = await products.save({
            title: 'Calculadora',
            price: 234.56,       
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
        })
        let product3 = await products.save({
            title: 'Globo Terráqueo',
            price: 345.67,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
        })
        console.log(await products.getAll())
        console.log(await products.getById(2))
        await products.deleteById(1)
        console.log(getAll())
        await products.createOrReset('clean Container')
    } catch(err) {
        console.log(err)
    }
}
test()