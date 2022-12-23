const express = require('express');
const router = express.Router();

// Importando middlewares
const { uploadImage } = require('../middlewares/uploadImage');
const { verifyToken } = require('../middlewares/verifyToken');
// Importando controladores
const PetCtrl = require('../controllers/pet.controller');

// Ruta para crear o actualizar el perfil del mascota
router.post('/:id', verifyToken, PetCtrl.createPet);

// Ruta para subir la imagen de la mascota
router.put('/:id', verifyToken, uploadImage, PetCtrl.uploadAvatar);

// Ruta para cargar perfil de la mascota activo
router.get('/:id', PetCtrl.loadPet);

// Ruta para mostrar perfil de mascota
router.get('/view/:id', PetCtrl.viewPet);

// Ruta para listar todos las mascotas
router.get('/', PetCtrl.listPets);

module.exports = router;