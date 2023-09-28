const express = require('express');
const router = express.Router();
const roomTypeController = require('../controllers/roomTypeController');

// Ruta para crear un tipo de cuarto
router.post('/roomType/create', roomTypeController.createRoomType);
// Ruta para obtener todos los tipos de cuartos
router.get('/roomType/getAll', roomTypeController.getAllRoomTypes);

module.exports = router;