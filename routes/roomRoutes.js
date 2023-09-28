const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Ruta para crear un cuarto
router.post('/room/create', roomController.createRoom);
// Ruta para obtener todos los cuartos
router.get('/room/getAll', roomController.getAllRooms);
// Ruta para eliminar un cuarto
router.delete('/room/delete/:roomId', roomController.deleteRoom);

module.exports = router;