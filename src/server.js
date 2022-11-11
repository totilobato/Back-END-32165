const express = require('express')
const { Server:IOServer } = require('socket.io')
const path = require('path')
const app = express()
const serverExpress = app.listen(8080, () => console.log('Server listening on port 8080'))
const io = new IOServer(serverExpress)
const messages = []

app.use(express.static(path.join(__dirname, './public')))

io.on('connection', socket => {
    console.log(`user ${socket.id} connected`)
    io.emit('server:message', messages)
    io.on('connection', async(socket) =>{
    socket.emit('server:message', messages)
})
    socket.on('server:mensaje', data => {
        allMessages.innerHTML = ""
        
        data.forEach(message => {
            allMessages.innerHTML += `<h2>${message.username}: ${message.message}</h2>`
        })
    })
})