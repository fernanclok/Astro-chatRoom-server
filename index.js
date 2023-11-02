const express = require("express");
const app = express();
const cors = require("cors");
const https = require("https");
const fs = require("fs");
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
const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  connectionStateRecovery: {}
});

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

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  socket.on('chat message', async (messageData) => {
    console.log('Mensaje recibido en el servidor:', messageData);
    io.emit('chat message', messageData)
  })
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto:`, PORT);
});
