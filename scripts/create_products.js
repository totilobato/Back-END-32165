const knex = require('knex')
const configSQLite3 = require('./config.js')

const database = kenx(configSQLite3)

const createProductsTable = async () => {
    try{
    await database.schema.createTable('products', table => {
        table.increments('id').primary()
        table.string('title', 50)
        table.string('thumbnail', 50)
        table.integer('price')
    })
    console.log('Products Table Created!')
    database.destroy()
}catch(err){
    console.log(err)
    database.destroy()
}
}

createProductsTable()