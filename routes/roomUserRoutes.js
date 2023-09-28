const express = require('express');
const router = express.Router();
const roomUserController = require('../controllers/roomUserController');

// Ruta para crear un usuario a un cuarto
router.post('/roomUser/create', roomUserController.createRoomUser);
// Ruta para obtener todos los cuartos a los que un usuario pertenece con nombre del grupo
router.get('/roomUser/getAll/:userId', roomUserController.getAllUserRooms);
// Ruta para obtener todos los usuarios de un cuarto
router.get('/roomUser/getAll/room/:roomId', roomUserController.getAllRoomUsers);
// Ruta para eliminar un cuarto
router.delete('/roomUser/delete/:roomId', roomUserController.deleteRoom);
// Ruta para eliminar un usuario de un cuarto
router.delete('/roomUser/delete/:roomId/:userId', roomUserController.deleteRoomUser);

module.exports = router;