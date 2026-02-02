// Importamos mongoose para conectarnos a MongoDB
const mongoose = require('mongoose');
// función asincrona para conectar a la base de datos
const connectDB = async () => {
    try {
        // Espera a que Mongoose se conecte usando variables de entorno
        await mongoose.connect(process.env.DB_URL, {
        });
        // Mensaje de exito
        console.log('🎉🎉🥳🎉🎉 MongoDB connected 🎉🎉🥳🎉🎉');
    } catch (error){
        // En caso de error, lo mostramos en consola
        console.error('🍑🍆 MongoDB connection error:', error);
    }
}
// Exportamos la funcion para usarla en otros archivos.
module.exports = connectDB;