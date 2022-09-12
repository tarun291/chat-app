//const socket=require('socket.io');


const socket=io('http://localhost:8000');

const form=document.getElementById('send-container')
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
let myAudio = document.querySelector('#audio')

const append=(message, position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
      myAudio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";

})


let nme;
do{
    nme=prompt("Please enter your name");
}while(!nme)
socket.emit('new-user-joined',nme);

socket.on('user-joined',nme=>{
    append(`${nme} joined the chat`,'right');
})



socket.on('receive', data=>{
    append(`${data.name}:${data.message}`,'left')
})


socket.on('left', nme=>{
    append(`${nme} left the chat`, 'left')
})