const fs = require('fs-extra');
const cloudinary = require('../config/cloudinary');

const Service = require('../models/service');

// Método para listar todos los servicios
const listServices = async (req, res) => {
    // Obtenemos todos los servicios registrados
    const services = await Service.find().populate("tutor_id");

    res.status(200).json({
        services,
        msg: "Servicios cargados exitosamente."
    });
};

// Método para listar los servicios por tutor
const listServicesByTutor = async (req, res) => {
    // Obtenemos todos los servicios del tutor registrados
    const services = await Service.find({ tutor_id: req.params.id });

    res.status(200).json({
        services,
        msg: "Servicios cargados exitosamente."
    });
};

// Método para crear un servicio
const createService = async (req, res) => {
    const {
        title,
        description,
        price,
        quantity_max
    } = req.body;

    const service = new Service({
        title,
        description,
        price,
        quantity_max,
        tutor_id: req.params.id
    });
    // Guardamos el servicio en la BD
    const serviceSaved = await service.save();

    res.status(200).json({
        serviceSaved,
        msg: "Servicio creado exitosamente."
    });
};

// Método para subir la imagen del servicio
const uploadPhoto = async (req, res) => {
    let result = '';
    // Si se subio una imagen
    if (req.file) {
        // La cargamos a la base de datos
        result = await cloudinary.v2.uploader.upload(req.file.path);
        // Y la eliminamos del repositorio local
        await fs.unlink(req.file.path);
    }

    // Buscamos el servicio y actualizamos su foto si es que existe
    let service = await Service.findByIdAndUpdate(req.params.id, { 
        image: result.secure_url
    }, { new: true });

    // Si es que el servicio no existe
    if (!service)
        return res.status(400).json({
            msg: "Servicio no existe."
        });

    res.status(200).json({
        service,
        msg: "Imagen cargada exitosamente."
    });
};

// Método para borrar un servicio
const deleteService = async (req, res) => {
    // Buscamos el servicio a eliminar
    const service = await Service.findByIdAndDelete(req.params.id);

    // Si es que el servicio no existe
    if (!service)
        return res.status(400).json({
            msg: "Servicio no existe."
        });

    res.status(200).json({
        service,
        msg: "Servicio eliminado exitosamente."
    });
};

module.exports = {
    listServices,
    listServicesByTutor,
    createService,
    uploadPhoto,
    deleteService
}