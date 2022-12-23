const express = require('express');
const router = express.Router();

// Importando controladores
const AuthCtrl = require('../controllers/auth.controller');

// Método para iniciar sesión
router.post('/signin', AuthCtrl.signin);

// Método para registrar un usuario
router.post('/signup', AuthCtrl.signup);

module.exports = router;