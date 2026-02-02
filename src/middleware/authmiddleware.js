// src/middlewares/auth.middleware.js
//9. Importa el modelo de Usuario para buscar en la base de datos
const User = require("../models/user.model");
//9 Importamos la función para verificar tokens JWT
const { verifyToken } = require("../utils/token.utils");

// 9 Middleware para verificar autenticación
// Esperamos el token en el header "Authorization
const isAuth = async(req, res, next) => {
    //9 Extraemos el token del header Authorization( solo el token, sin "Bearer ")
    const token = req.headers.authorization?.replace("Bearer ", "");
    // 9. Si no hay token, respondemos con 401 No autorizado
    if (!token) {
        return res.status(401).json({ error: "No autorizado" });
    }
    try {
        // 9 Verificamos el token y obtenemos los datos decodificados
        const decoded = verifyToken(token);
        // 9 Buscamos el usuario en la base de datos usando el ID del token
        // 9. Buscamos el usuario en la BD usando el ID del token
        // 9. select('-password') = NO traer la contraseña
        const user = await User.findById(decoded.id).select('-password');
        // 9 Si el usuario no existe (fue eliminado) → FUERA
        if (!user) {
            return res.status(401).json({ error: "Usuario no existe" });
        }
        // 9. Guardamos el usuario en req.user para usarlo después
        req.user = user;
        // 9. TODO OK → Pasa al siguiente paso (controlador)
        next();
    } catch (error) {
        //9 Si hay un error (token inválido, usuario no encontrado, etc.), respondemos con 401
        return res.status(401).json({ error: "No autorizado" });
    }
}
// 9.2  Middleware para verificar si el usuario es admin
const isAdmin = (req, res, next) => {
    // 9.2 Verificamos si el rol es 'admin'
    // 9.2  req.user viene del middleware isAuth (paso 8)
    if (req.user?.rol !== 'admin') {
        return res.status(403).json({ error: "Solo administradores" });
    } 
    // 9.2 Es admin → Pasa al controlador
    next();
};
//9.3 Exportamos el middleware para usarlo en otras partes de la aplicación
module.exports = { isAuth, isAdmin };
