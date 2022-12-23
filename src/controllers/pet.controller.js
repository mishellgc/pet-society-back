const fs = require('fs-extra');
const cloudinary = require('../config/cloudinary');

// Importando modelos
const Pet = require('../models/pet');

// Método para crear o actualizar el perfil de la mascota
const createPet = async (req, res) => {
    const {
        name, 
        type, 
        specie, 
        sex, 
        birthday, 
        city,
        biography,
        network
    } = req.body;

    // Buscamos a la mascota y actualizamos sus datos si es que existe
    let pet = await Pet.findOneAndUpdate({ user_id: req.params.id }, { 
        name, 
        type, 
        specie, 
        sex, 
        birthday, 
        city,
        biography,
        network }, { new: true });
    let msgResp = "Perfil de la mascota actualizado exitosamente.";

    // Si es que la mascota no existe
    if (!pet) {
        const newPet = new Pet({
            name,
            surname,
            country,
            city,
            biography,
            network,
            user_id: req.params.id
        });
        // Guardamos el perfil de la mascota en la BD
        pet = await newPet.save();
        msgResp = "Perfil de mascota creado exitosamente.";
    }

    res.status(200).json({
        pet,
        msg: msgResp
    });
};

// Método para subir la imagen de la mascota
const uploadAvatar = async (req, res) => {
    let result = '';
    // Si se subio una imagen
    if (req.file) {
        // La cargamos a la base de datos
        result = await cloudinary.v2.uploader.upload(req.file.path);
        // Y la eliminamos del repositorio local
        await fs.unlink(req.file.path);
    }

    // Buscamos a la mascota y actualizamos su avatar si es que existe
    let pet = await Pet.findByIdAndUpdate(req.params.id, { 
        image: result.secure_url
    }, { new: true });

    // Si es que la mascota no existe
    if (!pet)
        return res.status(400).json({
            msg: "Mascota no existe."
        });

    res.status(200).json({
        pet,
        msg: "Imagen cargada exitosamente."
    });
};

// Método para cargar perfil de la mascota activo
const loadPet = async (req, res) => {
    const pet = await Pet.findOne({ user_id: req.params.id });

    // Si es que la mascota no existe
    if (!pet)
        return res.status(400).json({
            msg: "Mascota no existe."
        });

    res.status(200).json({
        pet,
        msg: "Perfil de mascota cargado exitosamente."
    });
};

// Método para mostrar perfil de mascota
const viewPet = async (req, res) => {
    const pet = await Pet.findById(req.params.id);

    // Si es que la mascota no existe
    if (!pet)
        return res.status(400).json({
            msg: "Mascota no existe."
        });

    res.status(200).json({
        pet,
        msg: "Perfil de mascota cargado exitosamente."
    });
};

// Método para listar todos las mascotas
const listPets = async (req, res) => {
    // Obtenemos todos los servicios registrados
    const pets = await Pet.find();

    res.status(200).json({
        pets,
        msg: "Mascotas cargados exitosamente."
    });
};

module.exports = {
    createPet,
    uploadAvatar,
    loadPet,
    viewPet,
    listPets
}