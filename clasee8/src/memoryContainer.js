class MemoryContainer {
    constructor(){
        this.data = []
    }
    getAll(){
        return this.data
    }
    save(object){
        object.id = this.data.length +1
        this.data.push(object)
        return object
    }
    getById(id){
        if(id){
            let objectId = this.data.find((object) => object.id == id)
            return objectId
        }else{
            return console.log('Product not found')
        }
    }
    updateProduct (id, newData){
        let indexFound = this.data.findIndex((object) =>object.id == id)
        newData.id = id
        this.data.splice(indexFound, 1, newData)
    }
    deleteById(id){
        let indexFound = this.data.findIndex((object) => object.id == id)
        let productDeleted = this.data.splice(indexFound, 1)
        console.log(productDeleted)
    }
}