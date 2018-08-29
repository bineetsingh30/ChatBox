let socket = io()
socket.on('connected', function(){
    console.log("Connected at " + socket.id)
})

socket.on('rcv_msg', function(msg) {
    let list = $('#msglist')
    list.append('<li>' + msg.user + ": " + msg.message + '</li>')
})

$(function(){
    let msg = $('#msg')
    let sendbtn = $('#sendmsg')
    let list = $('#msglist')

    let msgbox = $('#msg-box')
    let loginbox = $('#login-box')
    let loginbtn = $('#login-btn')
    let user = ""
    let username = $('#username')

    loginbtn.click(function(){
        user = username.val()

        socket.emit('login', {user: user})

        loginbox.hide()
        msgbox.show()
    })


    sendbtn.click(function(){
        socket.emit("send_msg", {
            user: user,
            message: msg.val()
        })
    })   
})