// 3. Creamos las rutas del modelo Book
//3. Importamos express
const express = require('express');
// 7.3 Importamos el middleware para subir imágenes
const upload = require('../middleware/file.middleware');
//9.4 Protegemos las rutas con autenticación
const { isAuth, isAdmin } = require('../middleware/authmiddleware');
//3. Importamos las funciones y las rutas de los controladores
const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/books.controllers');
//3. Creamos un router de express
const booksRouter = express.Router();
// 3. Definimos las rutas y las conectamos con sus controladores
// Endpoint: /books
// GET /books - Obtener todos los libros
// localhost:8080/books
booksRouter.get('/', getBooks);
// 3. GET /books/:id - Obtener un libro por ID
// localhost:8080/books/eliddellibro
booksRouter.get('/:id', getBookById);
// 4. POST /books - Crear un nuevo libro
// localhost:8080/books
// 7.3 Usamos la variable 'upload' que importamos arriba del tod
// 9.4 Protegemos la ruta para que solo usuarios autenticados y admin puedan crear libros
booksRouter.post('/', isAuth, isAdmin, upload.single('cover'), createBook);
// 5. PUT /books/:id - Actualizar un libro
// localhost:8080/books/eliddellibro
// 7.3 Usamos la variable 'upload' que importamos arriba del todo
// 9.4 Protegemos la ruta para que solo usuarios autenticados y admin puedan actualizar libros
booksRouter.put('/:id', isAuth, isAdmin, upload.single('cover'), updateBook);
// 6. DELETE /books/:id - Eliminar un libro
// localhost:8080/books/eliddellibro
// 9.4 Protegemos la ruta para que solo usuarios autenticados y admin puedan eliminar libros
booksRouter.delete('/:id', isAuth, isAdmin, deleteBook);
// 3 Exportamos el router
module.exports = booksRouter;