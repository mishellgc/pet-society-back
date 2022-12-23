const multer = require('multer');
const path = require('path');

const uploadImage = (req, res, next) => {
    upload(req, res, function(err) {
        if(err) {
            if(err instanceof multer.MulterError) {
                if(err.code == "LIMIT_FILE_SIZE") {
                    return res.status(500).json({
                        msg: "La imagen excede el peso máximo de 500kb."
                    })
                } else {
                    return res.status(500).json({
                        msg: err.message
                    })
                }
            } else {
                return res.status(500).json({
                    msg: err
                })
            }
        } else {
            next();
        }
    })
}

const upload = multer({
    limits: { fileSize: 500000 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/uploads'));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        const filesTypes = /jpeg|jpg|png/;
        const mimeType = filesTypes.test(file.mimetype);
        const extname = filesTypes.test(path.extname(file.originalname));
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb('El archivo debe ser una imagen válida.');
    }
}).single('image');

module.exports = {
    uploadImage
};