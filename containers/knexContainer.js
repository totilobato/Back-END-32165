const knex = require('knex')

class KnexContainer {
        constructor(option, table){
            this.db = knex(option)
            this.table = table
        }
        async save(){
            return await this.db(this.table)
        }
        async getAll(){
            return await this.db(this.table).select('*')
        }
        async getById(){
            return await this.db(this.table).select('*').where('id', '=', id)
        }
        async deleteAll(){
            return await this.db(this.table).del()
        }
        async deleteById(){
            return await this.db(this.table).del().where('id', '=', 2)
        }
}

module.exports = KnexContainer