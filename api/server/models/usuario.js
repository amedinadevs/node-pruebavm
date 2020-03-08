const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema =  new Schema({
    nombre: {
        type:String, 
        required: [true, 'El nombre es obligatorio']
    },
    apellidos: {
        type:String, 
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type:String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    telefono: {
        type: String,
        required: [false]
    },
    cp: {
        type: Number,
        required: [true, 'El código postal es obligatorio']
    },
    pais: {
        type: String,
        default: 'España'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

usuarioSchema.methods.toJSON = function () { // metodo que se ejecuta cuando se hace un print del objeto
    let user = this;
    let userObject = user.toObject();
    delete userObject.password; // por seguridad nunca devolveremos la contraseña
    
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.'});

module.exports = mongoose.model('Usuario', usuarioSchema);

