const express = require('express');
const router = express.Router();

// Importando middlewares
const { uploadImage } = require('../middlewares/uploadImage');
const { verifyToken } = require('../middlewares/verifyToken');
// Importando controladores
const ServiceCtrl = require('../controllers/service.controller');

// Ruta para listar todos los servicios
router.get('/', ServiceCtrl.listServices);

// Ruta para listar los servicios por tutor
router.get('/:id', ServiceCtrl.listServicesByTutor);

// Ruta para crear un servicio
router.post('/:id', verifyToken, ServiceCtrl.createService);

// Ruta para subir la imagen del servicio
router.put('/:id', verifyToken, uploadImage, ServiceCtrl.uploadPhoto);

// Ruta para borrar un servicio
router.delete('/:id', verifyToken, ServiceCtrl.deleteService);

module.exports = router;