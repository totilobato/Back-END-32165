const express = require('express')
const { Server } = require('socket.io')
const messagesContainer = require('./containers/messagesContainer')
const productsContainer = require('./containers/productsContainer.js')

const server = express()
const expressServer = server.listen(8080, () => console.log (`Listening on Port 8080`))
const io = new Server (expressServer)

server.use(express.static(path.join(__dirname, './public')))

io.on('connection', async (socket) => {
    socket.emit('server:message',await messagesContainer.getAll())
})

io.on('connection', async socket => {
    console.log('User connected')
    socket.on('client:message',async messageInfo => {
        await messagesContainer.save(messageInfo)
        io.emit('server:message',await messagesContainer.getAll())
    })
    socket.on('client: products', (data)=>{
        productsContainer.save(data)
        io.emit('server:products', productsContainer.getAll())
    })
})