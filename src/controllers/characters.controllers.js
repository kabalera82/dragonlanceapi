//3. Creamos el controlador de Personajes
// Importamos el modelo Character
const Character = require('../models/character.model');
//8.1 Importamos la función para elminar las imagenes de Cloudinary
const cloudinary = require('cloudinary').v2;
// Importamos el modelo Book para el populate
require('../models/book.model');

//3. --- Controlador para obtener todos los personajes ---- (GET /characters) ---
const getCharacters = async (req, res, next) => {
    // Envolvemos en try-catch para controlar los errores
    try {
        // Buscamos todos los personajes en la base de datos y populamos 
        // populate es un metodo de Mongoose que reemplaza el campo de ObjectId con el documento real referenciado
        const characters = await Character.find().populate('books');
        // Devolvemos los personajes encontrados
        console.log("personajes obtenidos correctamente 👍🍺🎉")
        return res.status(200).json(characters);
    } catch (error){
        // Si hay error pasamos al siguiente middleware de manejo de errores
        return next(error);
    }
};

//3. -- Controlador para obtener un personaje por ID -- (GET /characters/:id) --
const getCharacterById = async (req, res, next) => {
    try{
        // Obtenemos el ID desde los parámetros de la URL
        const { id } = req.params;
        // buscamos el personaje por su ID y populamos books
        const character = await Character.findById(id).populate('books');
        // Si no encontramos el personaje devolvemos un 404
        if (!character) {
            return res.status(404).json({ message: "Personaje no encontrado" });
        }
        // si lo encontramos devolvemos el personaje
        console.log("personaje obtenido correctamente 👍🍺🎉")
        return res.status(200).json(character);
    } catch (error) {
        return next(error);
    }
};

//4. --- Controlador para crear un nuevo personaje ---- (POST /characters) ---
const createCharacter =  async (req, res, next) => {
    try{
        // 8.1 Si la avatar es null
        let avatar = null;
        //8.1 Si hay un archivo en la peticion
        if(req.file){
            // el middlewatre ya ha subido la foto, cogemos la URL
            avatar = req.file.path;
        }
        // 8.1 Creamos el nuevo personaje con los datos del body y la URL de la imagen
        const newCharacter = new Character({
            ...req.body,
            avatar: avatar 
        });
        // Guardamos el personaje en la base de datos
        const createdCharacter = await newCharacter.save();
        // Devolvemos el personaje creado
        console.log("personaje creado correctamente 👍🍺🎉")
        return res.status(201).json(createdCharacter);
    } catch (error){
        // Validamos si es un error de validación de Mongoose
        return next(error);
    }
};

//5. --- Controlador para actualizar un personaje ---- (PUT /characters/:id) ---
const updateCharacter = async (req, res, next) => {
    try {
        // Obtenemos el ID desde los parametros de la URL
        const { id } = req.params;
        //8.1 Buscamos el libro original 
        const oldCharacter = await Character.findById(id);
        // 8.1 Si no existe el personaje devolvemos un 404
        if(!oldCharacter){
             return res.status(404).json({ error: '🕵️🕵️🕵️ Personaje no encontrado 🕵️🕵️🕵 ️' });
        }
        // 8.1 Preparamos los nuevos datos
        const newCharacterData = {...req.body };
        // 8.1 Si no envia una NUEVA iamgen:
        if(req.file){
            //8.1 Borramos la antigua de Cloudinary si existe
            if(oldCharacter.avatar){
                //8.1 Exraemos el public_id e la URL para borrarlo
                const imgName = oldCharacter.avatar.split('/').pop().split('.')[0];
                // 8.1Generamos el public_id completo
                const publicId = `Libreria_Oscura/${imgName}`; // Asegúrate que coincida con tu carpeta
                // 8.1 Esperamos a que se borre la imagen
                await cloudinary.uploader.destroy (publicId);
            }
            // 8.1 Actualizamos la nueva URL de la imagen
            newCharacterData.avatar = req.file.path;
        }
        
        // Buscamos y actualizamos
        // Tomamos tres argumentos: ID, Datos Nuevos,configuración
        // Actualizamos con los newCharacterData que incluye la nueva URL si se ha subido una nueva imagen
        const updatedCharacter = await Character.findByIdAndUpdate(
            id,
            newCharacterData,
            { new: true }    
        ).populate('books');

        // Si no encontramos el personaje devolvemos un 404
        if (!updatedCharacter) {
            return res.status(404).json({ error: '🕵️🕵️🕵️ Personaje no encontrado 🕵️🕵️🕵️' });
        }
        // Devolvemos el personaje actualizado
        return res.status(200).json(updatedCharacter);
    } catch (error) {
        return next(error);
    }
};

//6. -- controlador para eliminar un personaje ---- (DELETE /characters/:id) ---
const deleteCharacter = async ( req, res, next) => {
    try {
        //8.1 Mediante destructuring sacamos el id de los parámetros
        const { id } = req.params;
        // Obtenemos el personaje por id desde los parámetros de la URL
        const deletedCharacter = await Character.findByIdAndDelete(id);
        // Si no existe el personaje devolvemos un 404
        // 8.1 Si no existe el personaje devolvemos un 404 y la imagen
        if(!deletedCharacter){
            return res.status(404).json({ error: '🕵️🕵️🕵️ Personaje no encontrado 🕵️🕵️🕵️' });
        }
        if(deletedCharacter.avatar){
            const imgName = deletedCharacter.avatar.split('/').pop().split('.')[0];
            const publicId = `Libreria_Oscura/${imgName}`;
            await cloudinary.uploader.destroy(publicId);
        }   
        // Devolvemos un mensaje de éxito
        return res.status(200).json({ message: '😶‍🌫️😶‍🌫️😶‍🌫️ Personaje eliminado correctamente 😶‍🌫️😶‍🌫️😶‍🌫️' });
    } catch (error) {
        return next(error);
    }
};


//3. --- Exportamos los controladores ---
//4. -- Añadimos cada controlador al export en este caso crear personaje --
//5. -- Añadimos el controlador de updateCharacter --
//6. -- Añadimos el controlador de deleteCharacter --
module.exports = {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};
