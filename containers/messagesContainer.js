const {configSQLite3} = require('../scripts/config.js')
const KnexContainer = require('./knexContainer.js')

class MessagesContainer extends KnexContainer{
    constructor(config){
        super(config, 'messages')
    }
}

module.exports = MessagesContainer(configSQLite3)