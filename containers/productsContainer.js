const {configMariaDB} = require('../scripts/config.js')
const KnexContainer = require('./knexContainer.js')

class ProductsContainer extends KnexContainer {
    constructor(config){
        super(config, 'products')
    }
}

module.exports = ProductsContainer(configMariaDB)