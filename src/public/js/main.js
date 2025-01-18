//Creamos a instancia del socket
const socket = io();

//Creamos la variable usuario
let user;

const chatBox = document.getElementById("chatBox");


Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingrese un nombre de usuario',
    inputValidator: (value) => {
        return !value && "Necesitas escribir el nombre para continuar"
    }, 
    allowOutsideClick: false
  }).then(result => {
    user = result.value;
    //aca esta el valor del usuario
    console.log(user);
  })

chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0) {
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = "";
        }
    }
});

// MenssageLogs
socket.on("messagesLogs", (data) => {
    const log = document.getElementById("messagesLogs");
    let message = "";
    data.forEach(mjs => {
        message = message + `${mjs.user} dice: ${mjs.message} <br>`;
        log.innerHTML = message;
    });        
})

