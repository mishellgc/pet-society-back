const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    surname: { 
        type: String, 
        required: true 
    },
    image: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.method({
    // Método para cifrar contraseña
    encryptPassword: function (password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    // Método para comparar contraseña cifrada
    comparePassword: function (receivePassword, password) {
        return bcrypt.compareSync(receivePassword, password);
    }
});

module.exports = mongoose.model('User', UserSchema);