// Arreglamos problema de DNS en algunas plataformas de hosting
// y el puto windows que no usa bien los DNS públicos
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


//1. Importamos el dotenv y lo configuramos para cargar las varibles de entorno
require('dotenv').config();
//1. Importamos express
const express = require("express");
//1. Importamos el conector de la base de datos
const connectDB = require("./src/config/db");
// 3. Importamos las rutas de los personajes
const charactersRouter = require("./src/routes/characters.routes");
// 3. Importamos las rutas de los libros
const booksRouter = require("./src/routes/books.routes");
// 9.4 Importamos las rutas de usuarios
const usersRouter = require("./src/routes/users.routes");
// 7.1 Importamos y configuramos el CORS
const cors = require("cors");
//1. Creamos una instancia de express
const app = express();
// ============ INSTRUCCIONES PARA EL SERVIDOR EJECUTADAS EN CASCADA =============================
//1. Middleware para parsear JSON en el body de las peticiones
app.use(express.json());
// 7.1 Middleware para habilitar CORS
app.use(cors());
//3.1 Ruta Base (Home) - Documentación simple
// 6.3 Ruta Home con documentación básica de la API
// AJUSTE: Cambiamos '/' por '/apidragonlance' para que coincida con Nginx
app.get('/apidragonlance', (req, res) => {
    res.status(200).json({
        message: "🐉 Bienvenido a la API de la Dragonlance 🐉",
        author: "kabalera82",
        documentation: {
            characters: [
            { method: "GET", url: "https://dragonlanceapi.vercel.app/apidragonlance/characters", description: "Ver todos los personajes" },
                { method: "GET", url: "https://dragonlanceapi.vercel.app/apidragonlance/characters/:id", description: "Ver personaje por ID" },
                { method: "GET", url: "https://dragonlanceapi.vercel.app/apidragonlance/characters/name/:name", description: "Buscar por nombre" },
                { method: "POST", url: "https://dragonlanceapi.vercel.app/apidragonlance/characters", description: "Crear personaje nuevo" },
                { method: "PUT", url: "https://dragonlanceapi.vercel.app/apidragonlance/characters/:id", description: "Editar personaje" },
                { method: "DELETE", url: "https://dragonlanceapi.vercel.app/apidragonlance/characters/:id", description: "Eliminar personaje" }
            ],
            books: [
                { method: "GET", url: "https://dragonlanceapi.vercel.app/apidragonlance/books", description: "Ver todos los libros" },
                { method: "GET", url: "https://dragonlanceapi.vercel.app/apidragonlance/books/:id", description: "Ver libro por ID" },
                { method: "POST", url: "https://dragonlanceapi.vercel.app/apidragonlance/books", description: "Crear libro nuevo" },
                { method: "PUT", url: "https://dragonlanceapi.vercel.app/apidragonlance/books/:id", description: "Editar libro" },
                { method: "DELETE", url: "https://dragonlanceapi.vercel.app/apidragonlance/books/:id", description: "Eliminar libro" }
            ]
        }
    });
});
// 3. Montamos las rutas de personajes en el path /
// AJUSTE: Añadimos el prefijo /apidragonlance
app.use("/apidragonlance/characters", charactersRouter);
// 3. Montamos las rutas de libros en el path /books
// AJUSTE: Añadimos el prefijo /apidragonlance
app.use("/apidragonlance/books", booksRouter);
//9.4 Rutas de usuarios
app.use("/apidragonlance/users", usersRouter);
// ------------ RUTAS -------------------------------------------------------
// 1. Ruta no encontrada
app.use((req,res)=>{
    return res.status(404).json({error: '🖕🖕 Ruta no encontrada 🖕🖕'});
})
// ------------ MIDDLEWARES DE ERROR -------IMPORTANTE AL FINAL -------------------------
//3. Middleware para manejar errores generales (Para el next(error))
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
    });
});
// =============== ENTRADAS Y SALIDAS DEL SERVIDOR ==========================
// ------------ SERVIDOR -----------------------------------------------------
//1. Puerto de recambio por si no funciona la variable de entorno
// AJUSTE: Cambiado a 3000 para coincidir con la config de Nginx
const PORT = process.env.PORT || 3000;
// 1. Levantamos el servidor
app.listen(PORT, () =>{
    console.log(`🍺🍺🍺🍺 Servidor levantado en http://localhost:${PORT} 🍺🍺🍺🍺`);
})

// ------------ llamadas a las funciones ---------------------------------------
// 1. llamada a la función de conexión a la base de datos
connectDB();