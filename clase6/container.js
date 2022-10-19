const fs = require('fs')

class Container {
    constructor(route) {
        this.route = route
        if (!fs.existsSync(`./${this.route}`)){
            fs.promises.writeFile(`./${this.route}`, '[]')
            .then(() => console.log(`${this.route} created`))
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
}
module.exports = Container