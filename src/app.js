// Importamos handlebars
import { engine } from "express-handlebars"
// Importamos utils
import __dirname from "./utils.js";
// Configuramos el server
import express from "express";
const app = express();
const PORT = 8080;
// Importamos el metodo server de la socket.io
import { Server } from 'socket.io'
//Importamos el contenedor de vistas y le asignamos un alias ViewsRouter
import viewsRoutes from "./routes/views.routes.js"


// Middleware
app.use(express.json());
app.use(express.urlencoded({extends: true})); 
app.use(express.static(`${(__dirname)}/public`))

// Set Views
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Routes
app.use("/", viewsRoutes);


// 1) Importamos la libreria de Socket.IO
// 2) Guardo en una constante la funcionalidad de listener
// 3) Generamos ina instancia desde lado del backend

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

const io = new Server(server);

// Creamos un array para guardar los mensajes que se envian por el chat

let message = [];

io.on("connection", (socket) => {
    
    //como hago para interpretar el mensaje
    socket.on("message", (data) => {
       message.push(data);
       io.emit("messagesLogs", message);
    });

})