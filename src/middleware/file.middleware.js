// 7.3 Configuración de Multer y Cloudinary para la subida de imágenes
const multer = require("multer");
// 7.2.1. Importamos la librería de Cloudinary
const cloudinary = require("cloudinary").v2; 
// Importamos la librería de almacenamiento de Cloudinary para Multer
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// 7.2.2. Configuración de las claves de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// 7.2.3. Crear el almacenamiento con Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Libreria_Oscura", // Carpeta en Cloudinary
        allowedFormats: ["jpg", "png", "jpeg", "webp"],
    },
});
// 7.2 Creamos la función 'upload' que usaremos en las rutas
const upload = multer({ storage });
// 7.2 Exportamos la función 'upload' para usarla en las rutas
module.exports = upload;