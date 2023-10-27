const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const messageModel = require("./models/messageModel");

//configuracion de CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Incluye esta línea para servir la biblioteca Socket.io
app.use(
  "/socket.io",
  express.static(__dirname + "/node_modules/socket.io/client-dist")
);

// importar rutas
const userRoutes = require("./routes/userRoutes");
const roomTypeRoutes = require("./routes/roomTypeRoutes");
const roomRoutes = require("./routes/roomRoutes");
const roomUserRoutes = require("./routes/roomUserRoutes");
const messageTypeRoutes = require("./routes/messageTypeRoutes");
const messageRoutes = require("./routes/messageRoutes");
// rutas
app.use("/api", userRoutes);
app.use("/api", roomTypeRoutes);
app.use("/api", roomRoutes);
app.use("/api", roomUserRoutes);
app.use("/api", messageTypeRoutes);
app.use("/api", messageRoutes);

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("join room", (roomId) => {
    socket.join(roomId);
    console.log(`Cliente se ha unido a la sala: ${roomId}`);

  });

  socket.on('chat message', async (messageData) => {
    console.log("mensaje recibido", messageData);
    try {
      const messageId = await messageModel.createMessage(messageData);
      messageData.id = messageId;
  
      // Emitir el mensaje a todos los usuarios en la sala
      io.to(messageData.room_id).emit('message', messageData);
  
      console.log("mensaje emitido a todos los usuarios en la sala", messageData);
    } catch (error) {
      console.error('Error al guardar el mensaje en la base de datos:', error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});;

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto:`, PORT);
});
