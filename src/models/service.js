const mongoose = require('mongoose');

const { Schema } = mongoose;

const ServiceSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: {
        type: String, 
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity_max: {
        type: Number,
        required: true
    },
    tutor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutor",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Service', ServiceSchema);