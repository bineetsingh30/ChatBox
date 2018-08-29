const express = require('express')
const app = express()
const http = require('http')
const socketio = require("socket.io")
const server = http.Server(app)
const io = socketio(server)

let users = {}

app.use('/', express.static("./frontend"))

io.on("connection", function(socket){
    console.log("User connected at " + socket.id)
    io.emit('connected')

    socket.on('login', function(data){
        users[data.user] = socket.id;
    })

    socket.on('send_msg', function(data){
        if(data.message.startsWith('@')){
            let recipient = data.message.split(":")[0].substr(1)
            console.log(users[recipient])

            io.to(users[recipient]).emit('rcv_msg', data)
        } else {
            socket.broadcast.emit('rcv_msg', data)
        }
    })

})

server.listen(2000)