const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const PetSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    type: {
        type: String
    },
    specie: {
        type: String
    },
    sex: {
        type: String
    },
    birthday: {
        type: String
    },
    city: {
        type: String
    },
    biography: {
        type: String
    },
    image: {
        type: String
    },
    network: {
        mobile: {
            type: String
        },
        webemail: {
            type: String
        },
        website1: { 
            type: String 
        },
        website2: { 
            type: String 
        },
        facebook: { 
            type: String 
        },
        instagram: { 
            type: String 
        },
        youtube: { 
            type: String 
        }
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Pet', PetSchema);