const express = require('express');
const router = express.Router();
const messageTypeController = require('../controllers/messageTypeController');

// Ruta para crear un tipo de mensaje
router.post('/messageType/create', messageTypeController.createMessageType);
// Ruta para obtener todos los tipos de mensajes
router.get('/messageType/getAll', messageTypeController.getAllMessageTypes);

module.exports = router;