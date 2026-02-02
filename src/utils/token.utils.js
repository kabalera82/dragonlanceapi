// 9.5 importamos jsonwebtoken
const jwt = require("jsonwebtoken");
// 9.5 función para generar token
const generateToken = (id, username) => {
    // 9.5 firmamos el token con el id y username, usando la clave secreta del .env
    return jwt.sign({ id, username }, process.env.JWT_SECRET, {
        // 9.5 el token expira en 30 minutos
        expiresIn: "30m",
    });
}
// 9.5 función para verificar token
const verifyToken = (token) => {
    // 9.5 verificamos el token usando la clave secreta del .env
    return jwt.verify(token, process.env.JWT_SECRET);
}
// 9.5 exportamos las funciones
module.exports = { generateToken, verifyToken };