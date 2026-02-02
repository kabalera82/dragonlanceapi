const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userNombre: { type: String, required: true, trim: true, unique: true },
    password: {
        type: String,
        required: true,
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"], // ← Quité comilla extra
    },
    edad: { type: Number, min: 0 },
    genero: {
        type: String,
        enum: ['masculino', 'femenino', 'otro']
    },
    email: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        lowercase: true,
        sparse: true  // ← AÑADIR: Permite múltiples null sin violar unique
    },
    avatar: { 
        type: String, 
        default: 'https://via.placeholder.com/150',
        required: false
    },
    rol: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    activo: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);
module.exports = User;