const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    // Si no se encuentra el token
    if(!token)
        return res.status(400).json({
            msg: "Token no encontrado."
        });
    // Si se encuentra el token, lo guardamos
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Obtenemos el id del usuario
    req.userId = decoded.id;
    
    // Buscamos al usuario del token proporcionado
    const user = await User.findById(req.userId);
    // Si no se encuentra al usuario
    if(!user)
        return res.status(400).json({
            msg: "Usuario no existe."
        });
    // Si se encuentra al usuario, continuamos el proceso
    next();
}

module.exports = {
    verifyToken
};