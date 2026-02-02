// 3. Creamos las rutas del modelo Character
//3. Importamos express
const express = require('express');
// 8.2 Importamos el middleware para subir imágenes
const upload = require('../middleware/file.middleware');
// 9.4 Protegemos las rutas con autenticación
const { isAuth, isAdmin } = require('../middleware/authmiddleware');
//3. Importamos las funciones y las rutas de los controladores
//4. Importamos las funciones createCharacter
// 5. Importamos la función updateCharacter
// 6. Importamos la función deleteCharacter
const {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
} = require('../controllers/characters.controllers');
const { create } = require('../models/character.model');
//3. Creamos un router de express
const charactersRouter = express.Router();
//3. Definimos las rutas y las conectamos con sus controladores
// Endpoint: /characters
// GET /characters - Obtener todos los personajes
// localhost:8080/characters
charactersRouter.get('/', getCharacters);
//3. GET /characters/:id - Obtener un personaje por ID
// localhost:8080/characters/elidelpersonaje
charactersRouter.get('/:id', getCharacterById);
//4. POST /characters - Crear un nuevo personaje
// localhost:8080/characters
// 8.2 Usamos la variable 'upload' que importamos arriba del todo
// 9.4 Protegemos la ruta para que solo  admin puedan crear personajes
charactersRouter.post('/', isAuth, isAdmin, upload.single('avatar'), createCharacter);
//5. PUT /characters/:id - Actualizar un personaje
// localhost:8080/characters/elidelpersonaje
// 8.2 Usamos la variable 'upload' que importamos arriba del todo
// 9.4 Protegemos la ruta para que solo admin puedan actualizar personajes
charactersRouter.put('/:id', isAuth, isAdmin, upload.single('avatar'), updateCharacter);
//6. DELETE /characters/:id - Eliminar un personaje
// localhost:8080/characters/elidelpersonaje
// 9.4 Protegemos la ruta para que solo admin puedan eliminar personajes
charactersRouter.delete('/:id', isAuth, isAdmin, deleteCharacter);
// 3 Exportamos el router
module.exports = charactersRouter;