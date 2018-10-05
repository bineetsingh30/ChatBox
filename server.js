const express = require('express')
const app = express()
const http = require('http')
const socketio = require("socket.io")
const server = http.Server(app)
const io = socketio(server)
const uniqid = require('uniqid');

let rooms = {}

app.use('/', express.static("./frontend"))

io.on("connection", function(socket){
    socket.on('createroom', function(data){
        let id = uniqid()
        rooms[id] = {"password": data.password, "users": [{"name": data.name, "socketid": socket.id}]}
        socket.emit('roomcreated', {"id": id, "name": data.name})
    })

    socket.on('enterroom', function(data){
        if(rooms[data.id] == undefined || rooms[data.id]["password"] != data.password){
            socket.emit('noroomexists');
        } else {
            rooms[data.id]["users"].push({"name": data.name, "socketid": socket.id})
            socket.emit('roomcreated', {"id": data.id, "name": data.name})
        }
    })

    socket.on('send_msg', function(data){
        let username = null;
        for(let user of rooms[data.id]["users"]){
            if(user["socketid"] == socket.id){
                username = user['name']
            }
        }
        

        for(let user of rooms[data.id]["users"]){
            io.to(user["socketid"]).emit('rcv_msg', {"name": username, "message": data.message})
        }

    })
})

server.listen(2000)