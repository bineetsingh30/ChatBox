let socket = io()
let login = $('#login')
$(function(){
    let submit = $('#submit')
    console.log(submit)
    submit.click(function(){
        let username = $('#username').val()
        if(username == undefined){
            alert('Username cannot be empty')
        } else {
            socket.emit('login', {username: username})
            login.hide()
            
        }    
    })

    let enter = $('#enter')
    let create  = $('#create')
    create.click(function(){
        enter.hide()
        create.hide()
        
    })


})
