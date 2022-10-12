const fs = require('fs')

class Container {
    constructor (route) {
        this.route = route
    }
    async save(object){
        try {
            let data = await fs.promises.readFile(this.route)
            if (data?.length == 0){
                object.id = 1

                const jsonData = [object]

                await fs.promises.writeFile(
                    this.route,
                    JSON.stringify(jsonData, null, 2)
                )
            return object.id
            } else {
                const content = JSON.parse(data)
                let lastIndex = content.length -1
                let newId = content[lastIndex].id +1
                object.id = newId
                content.push(object)

                await fs.promises.writeFile(this.route, JSON.stringify(content))
                return newId
            }
        } catch (err) {
            console.log(err)
        }
    }
    async getById(id){
        try{
            const findObject = await fs.promises.readFile(this.route, 'utf-8')
            let objectFound = JSON.parse(findObject)
            let object = objectFound.find(object => object.id == id)
            return object
        }catch(err){
            console.log(err)
        }
    }
    async getAll(){
        const data = await fs.promises.readFile(this.route, 'utf-8')
        try{
            return JSON.parse(data)
        }catch(err){
            console.log(err)
        }
    }
    async deleteById(id){
        try{
        const findObject = await fs.promises.readFile(this.route, 'utf-8')
        let objectFound = JSON.parse(findObject)
        let indexFound = objectFound.findIndex(object => object.id == id)
        let objectDeleted = objectFound.splice(indexFound, 1)
        console.log(objectDeleted)
        }catch(err){
            console.log(err)
        }
    }
    async deleteAll(){
        const objectsDeleted = await fs.promises.writeFile(this.route, '[]')
    }
}

const tests = async () => {
    try {
        const productsContainer = new Container('products.txt')
        const newId = await productsContainer.save([
            {title: "Growing Tent", price: 20000, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_684645-MLA50776302240_072022-O.webp"},
            {title: "LED Lights", price: 40000, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_711528-MLA50303703288_062022-O.webp"},
            {title: "Cellulose Papers", price: 270, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_708376-MLA45013033295_022021-O.webp"}
        ])
        console.log(newId)
        const productFound = await productsContainer.getById(2)
        console.log(productFound)

        const products = await productsContainer.getAll()
        console.log(products)

        const productDeleted = await productsContainer.deleteById(1)
        console.log(productDeleted)

        const deleteProducts = await productsContainer.deleteAll()
        console.log(deleteProducts)
    } catch (err) {
        console.log(err)
    }
}

tests()