const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para autenticar un usuario
router.post('/user/auth', userController.authUser);
// Ruta para crear un usuario
router.post('/user/create', userController.createUser);
// Ruta para obtener todos los usuarios
router.get('/user/getAll', userController.getAllUsers);
// Ruta para obtener un usuario por id
router.get('/user/getById/:id', userController.getUserById);
// Ruta para obtener un usuario por nombre de usuario
router.get('/user/getByUsername/:username', userController.getUserByUsername);
// Ruta para actualizar un usuario
router.put('/user/update/:id', userController.updateUser);
// Ruta para eliminar un usuario
router.delete('/user/delete/:id', userController.deleteUser);

module.exports = router;