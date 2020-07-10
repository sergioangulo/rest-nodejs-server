const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es mandatorio']
    },
    email: {
        type: String,
        unique: true,
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
        default: 'USER_ROLE',
        enum: rolesValidos
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

module.exports = mongoose.model('Usuario', usuarioSchema);