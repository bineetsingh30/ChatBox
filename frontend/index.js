let socket = io()
var roomidglobal = null;

socket.on('roomcreated', function(data){
    $('#login').hide()
    $('#messagebox').show()
    $('#messagebox').prepend(`Room id: ${data.id}`)
    socket.emit('send_msg', {"message": `Joined`, id: data.id} )
    roomidglobal = data.id;
})

socket.on("noroomexists", function(){
    alert('Room details incorrect')
})

socket.on('rcv_msg', function(data){
    let messagelist = $('#message-list')
    messagelist.append(`<li>${data.name}: ${data.message}</li>`)
})

$(function(){
    let enter = $('#enter')
    let create  = $('#create')
    
    create.click(function(){
        enter.hide()
        create.hide()
        let creatediv = $('#creatediv')
        creatediv.show()
    })

    enter.click(function(){
        enter.hide()
        create.hide()
        let enterdiv = $('#enterdiv')
        enterdiv.show()
    })

    let createroom = $('#createroom')
    let enterroom = $('#enterroom')

    createroom.click(function(){
        let username = $('#cusername').val()
        let password = $('#cpassword').val()

        if(username == "" || password == ""){
            alert("Field cannot be empty")
        } else {
            socket.emit('createroom', {"name": username, "password": password})
        }
    })


    enterroom.click(function(){
        let username = $('#eusername').val()
        let password = $('#epassword').val()
        let roomid = $('#roomid').val()

        if(username == "" || password == "" || roomid == ""){
            alert("Field cannot be empty")
        } else {
            socket.emit('enterroom', {"name": username, "password": password, "id": roomid})
        }
    })

    let sendbutton = $('#sendbutton')
    sendbutton.click(function(){
        let message = $('#sendmessage').val()
        if(message == ""){
            alert("Enter a message")
        } else {
            socket.emit('send_msg', {"message": message, id: roomidglobal} )
        }
    })

})
