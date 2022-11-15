const fs = require('fs')

module.exports = class Container {
    constructor(fileName){
        this.fileName = `./storage/${fileName}`
        this.count = 0
    }
    async createOrReset(type) {
        try {
            await fs.promises.writeFile(this.fileName, "[]")
            console.log(type)
        } catch(err) {
            console.log(err)
        }
    }

    async save(product) {
        let array = []
        try {
            array = await fs.promises.readFile(this.fileName, 'utf-8')
            array = JSON.parse(array)
            this.count = [...array].pop().id
        } catch(err) {
            try {
                await this.createOrReset('container created')
            } catch(error) {
                console.log(error)
            }
        }
        array.push({
            ...product,
            id: this.count+1
        })
        array = JSON.stringify(array, null, 3)
        await fs.promises.writeFile(this.fileName, array)
        return this.count+1
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data)
            if (data.length>0){
                return data
            }else{
                return null
            }
        }catch(err) {
            console.log(err)
        }
    }

    async getRandom() {
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data)
            if(data.length>0){
                let random = parseInt(Math.random()*(data.length-1))
                return data[random]
            }else{
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data)
            let product = data.find(prod => prod.id == id)
            if(product){
                return product
            }else{
                return null
            }
        } catch(err) {
            console.log(err)
        }
    }

    async putById(id, produ){
    try {
        let data = await fs.promises.readFile(this.fileName, 'utf-8')
        data = JSON.parse(data)
        let product = data.find(prod => prod.id == id)
        if(product){
            product = {
                ...product,
                ...produ
            }
            data = data.map(pro => {
                if (pro.id==product.id){
                    pro = product
                }
                return pro
            })
            data = JSON.stringify(data, null, 3)
            await fs.promises.writeFile(this.fileName, data)
            return product
        }else{
            return null
        }
    } catch(err) {
        console.log(err)
    }}
    async updateProduct (id, newData){
        const findObject = await fs.promises.readFile(this.fileName, 'utf-8')
        let objectFound = JSON.parse(findObject)
        let indexFound = objectFound.findeIndex(object => object.id ==id)
        let objectUpdated = objectFound.splice(indexFound, 1, newData)
        return objectUpdated
    }
    async deleteById(id){
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8')
            data = JSON.parse(data)
            let product = data.find(pro => pro.id != id)
            if (product) {
                data = data.filter(pro => pro.id !=id)
                data = JSON.stringify(data, null, 3)
                await fs.promises.writeFile(this.fileName, data)
                return data
            }else{
                return null
            }
        } catch(err) {
            console.log(err)
        }
    }
    async deleteAll(){
        const deleteObjects = await fs.promises.writeFile(this.fileName, '[]')
        console.log(deleteObjects)
    }
}