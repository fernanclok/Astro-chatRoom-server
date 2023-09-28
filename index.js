const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();


const messageModel = require('./models/messageModel');


//configuracion de CORS
app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
));

app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Incluye esta línea para servir la biblioteca Socket.io
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));

// importar rutas
const userRoutes = require('./routes/userRoutes');
const roomTypeRoutes = require('./routes/roomTypeRoutes');
const roomRoutes = require('./routes/roomRoutes');
const roomUserRoutes = require('./routes/roomUserRoutes');
const messageTypeRoutes = require('./routes/messageTypeRoutes');
const messageRoutes = require('./routes/messageRoutes');
// rutas
app.use('/api', userRoutes);
app.use('/api', roomTypeRoutes);
app.use('/api', roomRoutes);
app.use('/api', roomUserRoutes);
app.use('/api', messageTypeRoutes);
app.use('/api', messageRoutes);

io.on('connection', (socket) => {
  console.log('Cliente conectado');

// Manejar eventos personalizados, por ejemplo, cuando un cliente envía un mensaje
socket.on('chat message', async (messageData) => {
  console.log("mensaje recibido", messageData);
  try {
    io.to(messageData.room_Id).emit('message', messageData);
      console.log("mensaje emitido a todos los clientes en la sala", messageData);

      // Llama a la función createMessage para insertar el mensaje en la base de datos
      const messageId = await messageModel.createMessage(messageData);

      // Agrega el ID del mensaje al objeto de datos
      messageData.id = messageId;
  } catch (error) {
      // Maneja cualquier error que ocurra al guardar en la base de datos
      console.error('Error al guardar el mensaje en la base de datos:', error);
  }
});


  // Manejar la desconexión de un cliente
  socket.on('disconnect', () => {
      console.log('Cliente desconectado');
  });
});

// debug
const debugValue = process.env.DEBUG;
console.log(`DEBUG: ${debugValue}`);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto:`, PORT);
});


