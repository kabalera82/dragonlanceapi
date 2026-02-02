// 9.4 Creamos las rutas para los usuarios
// 9.4 Importamos express
const express = require('express');
// 9.4 Importamos el controlador de usuarios
const { register, login } = require('../controllers/users.controllers');
// 9.4 Importamos el middleware de autenticación (si es necesario)
const isAuth = require('../middleware/authmiddleware');

// 9.4 Creamos el router de usuarios
const usersRoutes = express.Router();
// 9.4 Ruta para registrar un nuevo usuario
// Endpoint: POST http://localhost:PORT/api/users/register
usersRoutes.post('/register', register);
// 9.4 Ruta para login de usuario
// Endpoint: POST http://localhost:PORT/api/users/login
usersRoutes.post('/login', login);
// 9.4 Exportamos el router de usuarios
module.exports = usersRoutes;