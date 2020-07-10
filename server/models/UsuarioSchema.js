const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es mandatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es mandatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es mandatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UsuarioSchema', usuarioSchema);