const mongoose = require('mongoose');
//Queremos crear un nuevo modelo de datos (en el mismo proyecto) pero para usuarios: nombre, usuario, contraseña y edad

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
);

module.exports = mongoose.model('User', userSchema);