//7.3 Importamos Cloudinary
const cloudinary = require("cloudinary").v2;
// 7.3 Función para eliminar imagenes de Cloudinary
const deleteImgCloudinary = async (publicID) => {
    // Si no llega el ID público, no hacemos nada
    if (!publicID) return;
    try {
        // Usamos el método correcto para borrar por Public ID
        await cloudinary.uploader.destroy(publicID);
        console.log("Imagen eliminada de Cloudinary:", publicID);
    } catch (error) {
        console.error("Error al borrar en Cloudinary:", error);
    }
};

// 7.3 Función para subir imagenes a Cloudinary
const createImgBook = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "libreria", // Carpeta en Cloudinary
            allowedFormats: ["jpg", "png", "jpeg", "webp"],
        });
        return {
            imgUrl: result.secure_url,
            imgId: result.public_id,
        };
    } catch (error) {
        console.error("Error al subir imagen a Cloudinary:", error);
        throw error;
    }
};


// Exportamos las funciones
module.exports = {
    deleteImgCloudinary,
    createImgBook,
};