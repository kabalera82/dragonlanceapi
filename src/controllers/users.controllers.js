//9.2 Creamos el controlador de los user
const User = require("../models/user.model");
//9.2 Importamos bcrypt para comparar contraseñas
const bcrypt = require("bcrypt");
//9.2 Importamos la función para generar tokens JWT
const { generateToken } = require("../utils/token.utils");

//9.2 Controlador para registrar un nuevo usuario
const register = async (req, res) => {
    try {
        //9.2 Verificamos si el userNombre ya existe
        const existingUser = await User.findOne({ userNombre: req.body.userNombre });
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }
        //9.2 Creamos una nueva instancia del modelo User con los datos del body
        const newUser = new User(req.body);
        //9.2 Al hacer save(), tu modelo (user.models.js) se encarga de encriptar
        const createdUser = await newUser.save();
        //9.2 Creamos el objeto de respuesta
        const userResponse = createdUser.toObject();
        // 9.2 Eliminamos la contraseña del objeto de respuesta
        delete userResponse.password;
        //9.2 Respondemos con el usuario creado y código 201
        return res.status(201).json(userResponse);
    } catch (error) {
        //9.2 En caso de error, respondemos con código 500 y mensaje genérico
        return res.status(500).json({ error: "Error registrando al usuario" });
    }
};

//9.2 Controlador para loguear un usuario existente
const login = async (req, res) => {
    try {
        //9.2 1. Buscamos por userNombre (que es como se llama en tu DB)
        const { userNombre, password } = req.body;
        
        // Validar que vengan los campos
        if (!userNombre || !password) {
            return res.status(400).json({ error: "Usuario y contraseña requeridos" });
        }        
        // 9.2 Buscamos el usuario en la base de datos y traes el cuerpo completo
        const user = await User.findOne({ userNombre });
        
        //9.2 Si no encontramos el usuario, respondemos con 404
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        //9.2 2. Comprobamos contraseña usando compareSync (tal cual el tutorial)
        const validPassword = bcrypt.compareSync(password, user.password);
        
        //9.2 Si la contraseña no es válida, respondemos con 401
        if (!validPassword) {
            return res.status(401).json({ error: "Contraseña no valida" });
        }

        //9.2 3. Generamos token con userNombre
        const token = generateToken(user._id, user.userNombre);
        //9.2 Respondemos con el token y código 200
        return res.status(200).json({ 
            token,
            user: {
                id: user._id,
                userNombre: user.userNombre,
                rol: user.rol,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        //9.2 En caso de error, respondemos con código 400 y mensaje genérico
        return res.status(400).json({ error: "Error logueando al usuario" });
    }
};

//9.2 Exportamos los controladores para usarlos en las rutas
module.exports = { register, login };
