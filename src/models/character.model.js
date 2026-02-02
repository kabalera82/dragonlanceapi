// 2. Modelo de Libro (Book)
// Importamos mongoose
const mongoose = require('mongoose');
// Definimos el esquema
const characterSchema = new mongoose.Schema({
    // 1. Identificación Básica
    name: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    nickname: { 
        type: String, 
        trim: true,
        default: null 
    },
    
    // 2. Rasgos
    race: { 
        type: String,
        required: true,
        // He añadido 'Draconian' y 'Minotaur' que son vitales en Dragonlance
        enum: ['Human', 'Elf', 'Dwarf', 'Kender', 'Gnome', 'Draconian', 'Minotaur', 'Half-Elf', 'Other'],
        trim: true 
    },
    class: { // Ej: Mage, Warrior
        type: String, 
        required: true,
        trim: true 
    },
    role: { // Ej: Protagonista, Antagonista
        type: String,
        trim: true,
        default: null
    },
    faction: { // Ej: Orders of High Sorcery
        type: String, 
        trim: true 
    },

    // CORRECCIÓN AQUÍ: Sintaxis válida para Enum
    alignment: {
        type: String,
        enum: ['Good', 'Neutral', 'Evil'],
        default: 'Neutral',
        trim: true
    },

    // 3. Info Extra
    description: { 
        type: String, 
        trim: true 
    },
    avatar: { 
        type: String,
        default: 'https://res.cloudinary.com/dw6qgshkz/image/upload/v1769602366/nodisponible.jpg'
    },

    // 4. RELACIÓN CON LIBROS
    // Nota: La forma estándar es mongoose.Schema.Types.ObjectId
    books: [{type: mongoose.Types.ObjectId, ref: 'Book'}]
}, {
    timestamps: true,
    versionKey: false
});

// Creamos el modelo
const Character = mongoose.model('Character', characterSchema);
// Exportamos el modelo
module.exports = Character;