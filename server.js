const app = require('./app')

const PORT = process.env.PORT || 8080
app.set('port', PORT)

app.listen(app.get('port'), () =>{
    console.log('SERVER LISTENING ON PORT: '+app.get('port'))
})