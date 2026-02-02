// 3. Creamos el controlador de Libros
// Importamos el modelo Book
const Book = require('../models/book.model');
// 7.3 Importamos la función para eliminar imágenes de Cloudinary
const cloudinary = require('cloudinary').v2;
// Importamos el modelo Character para el populate
require('../models/character.model');


// 3. --- Controlador para obtener todos los libros ---- ( GET /books ) ---
const getBooks = async (req, res, next) => {
    // Envolvemos en try-catch para controlar los errores
    try {
        // 7.3 ponemos la variable de la imagen a null
        let coverUrl = null;
        //Buscamos todos lo libros en la base de datos
        // y los populamos: cambiar el id por el objeto completo refenciado
        const books = await Book.find().populate('characters');
        // Devolvemos los libros encontrados
        return  res.status(200).json(books);
    } catch (error){
        // Si hay error pasamos al siguiente middleware de manejo de errores
        return next(error);
    }
};

//3. --- Controlador para obtener un libro por ID --- ( GET /books/:id ) --- IGNORE ---
const getBookById = async(req,res, next) => {
    // Abrimos el bloque try catch
    try{
        // Obtenemos el Id desde los parametros de la URL
        const { id } = req.params;
        // Buscamos el libro por su ID y populamos con los personajes
        const book = await Book.findById(id).populate('characters');
        // si no encontramos el libro devolvemos un 404
        if(!book){
            return res.status(404).json({ message: "Libro no encontrado" });
        }
        // Si lo encontramos devolvemos el libro
        return res.status(200).json(book);
    }
    catch (error){
        return next (error);
    }
};

// 4. --- controlador para crear un nuevo liubro ---- ( POST /books ) ---
const createBook = async( req, res, next) => {
    try {
        // 7.3 si la cover es null
        let coverUrl = null;
        // 7.4 Si hay un archivo en la petición
        if (req.file) {
            // El middleware ya ha subido la foto, aquí cogemos la URL
            coverUrl = req.file.path;
        }
        // Creamos el nuevo libro con los datos del body
        const newBook = new Book({
            ...req.body,
            cover: coverUrl 
        });
        // Guardamos el libro en la base de datos;
        const createdBook = await newBook.save();
        // Devolvemos el libro creado
        return res.status(201).json(createdBook);
    } catch (error) {
        return next (error);
    }
};
// 5. --- Controlador para actualizar un libro ---- ( PUT /books/:id )
const updateBook = async ( req, res, next) => {
    try {
        // Obtenemos el ID desde los parámetros de la URL
        const { id } = req.params;
        // 7.3. Buscamos el libro original para ver si tenía imagen vieja
        const oldBook = await Book.findById(id);
        if (!oldBook) return res.status(404).json({ error: 'Libro no encontrado'});
        // 7.3. Preparamos los datos nuevos
        const newBookData = { ...req.body };
        // 7.3. Si nos envían una NUEVA imagen:
        if (req.file) {
            // A) Borramos la antigua de Cloudinary si existe
            if (oldBook.cover) {
                // Extraemos el public_id de la URL para borrarlo
                const imgName = oldBook.cover.split('/').pop().split('.')[0];
                const publicId = `Libreria_Oscura/${imgName}`; // Asegúrate que coincida con tu carpeta
                await cloudinary.uploader.destroy(publicId);
            }
            // B) Asignamos la nueva URL
            newBookData.cover = req.file.path;
        }
        // Buscamos y actualiamos el libro
        // Tomamos tres argumentos: ID, datos nuevos y configuración.
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            newBookData,
            { new: true }
        ).populate('characters');

        // Si no encontramos el libro devolvemos un 404
        if(!updatedBook){
            return res.status(404).json({ error: '🕵️🕵️🕵️ Libro no encontrado 🕵️🕵️🕵️' });
        }
        // Devolvemos el libro actualizado
        return res.status(200).json(updatedBook);   
    } catch (error) {
        return next (error);
    }
};
//6. --- Controlador para eliminar un libro ---- ( DELETE /books/:id ) 
const deleteBook = async ( req, res, next) => {
    try {
        // 7.3 Mediante destructuring sacamos el id de los parámetros
        const { id } = req.params;
        // Obtenemos el Libro por id desde los parámetros de la URL
        const deletedBook = await Book.findByIdAndDelete(id);
        // Si no existe el Libro devolvemos un 404
        if(!deletedBook){
            return res.status(404).json({ error: '🕵️🕵️🕵️ Libro no encontrado 🕵️🕵️🕵️' });
        }
        // 7.3 Si el libro tiene una imagen asociada, la eliminamos de Cloudinary
        if (deletedBook.cover) {
            const imgName = deletedBook.cover.split('/').pop().split('.')[0];
            const publicId = `Libreria_Oscura/${imgName}`;
            await cloudinary.uploader.destroy(publicId);
        }
        // Devolvemos un mensaje de éxito
        return res.status(200).json({ message: '😶‍🌫️😶‍🌫️😶‍🌫️ Libro eliminado correctamente 😶‍🌫️😶‍🌫️😶‍🌫️' });
    } catch (error) {
        return next(error);
    }
};

//3. --- Exportamos los controladores ---
//4. -- Añadimos cada controlador al export en este caso crear libro --
//5. -- Añadimos el controlador de updateBook --
//6. -- Añadimos el controlador de deleteBook --
module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};