// 2. Modelo de Libro (Book)
// Importamos mongoose
const mongoose = require('mongoose');
// Definimos el esquema
const bookSchema = new mongoose.Schema({
    // 1. Datos Esenciales
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    authors: [{ // Array porque suelen ser parejas (Weis & Hickman)
        type: String, 
        required: true, 
        trim: true 
    }],
    // 2. Orden de Lectura (Vital en Dragonlance)
    series: { // Ej: "Crónicas de la Dragonlance"
        type: String, 
        trim: true 
    },
    volume: { // Ej: 1
        type: Number 
    },
    year: { 
        type: Number 
    },
    // 3. Visuales
    cover: { 
        type: String, 
        default: 'https://res.cloudinary.com/dw6qgshkz/image/upload/v1769602366/nodisponible.jpg' 
    },
    synopsis: { 
        type: String, 
        trim: true 
    },

    // 4. RELACIÓN CON PERSONAJES
    // Array de IDs que apuntan al modelo 'Character'
    characters: [{ type: mongoose.Types.ObjectId, ref: 'Character'}]

}, {
    timestamps: true,
    versionKey: false
});
// Creamos el modelo
const Book = mongoose.model('Book', bookSchema);
// Exportamos el modelo
module.exports = Book;