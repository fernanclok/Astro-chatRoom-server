const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Ruta para crear un mensaje
router.post('/message/create', messageController.createMessage);
// Ruta para obtener todos los mensajes
router.get('/message/getAll', messageController.getAllMessages);
// Ruta para obtener todos los mensajes de un cuarto
router.get('/message/getAll/room/:roomId', messageController.getAllRoomMessages);
// Ruta para obtener todos los mensajes de un usuario en un cuarto
router.get('/message/getAll/room/:roomId/user/:userId', messageController.getAllUserRoomMessages);
// Ruta para obntener todos los mensajes de un usuario
router.get('/message/getAll/user/:userId', messageController.getAllUserMessages);
// Ruta para eliminar un mensaje
router.delete('/message/delete/:messageId', messageController.deleteMessage);

module.exports = router;