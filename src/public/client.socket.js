const socket = io()
const formMessage = document.querySelector('#formMessage')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const allMessages = document.querySelector('#allMessages')

function sendMessage() {
    try {
        const username = usernameInput.value
        const message = messageInput.value

        socket.emit('client: message', {username, message})
    } catch (err) {
        console.log(err)
    }
}

function renderMessages(messagesArray) {
    try {
        const html = messagesArray.map(messageInfo => {
            return(`<div>
                <strong>${messageInfo.username}</strong>:
                <em>${messageInfo.message}</em> </div>`)
        }).join(" ");

        allMessages.innerHTML = html
    } catch(error) {
        console.log(error)
    }
}

formMessage.addEventListener('submit', e => {
    e.preventDefault()
    sendMessage()
    messageInput.value = ""
})

socket.on('server:message', renderMessages)
socket.on('connection', async(socket) =>{
    socket.emit('server:message', messages)
})