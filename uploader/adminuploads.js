const multer = require('multer')

exports.uploadProductImage =  multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads')
            },
            filename: (req, file, cb) => {
                cb(null,  Date.now() + file.originalname )
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
                cb(null, true)
            } else {
                cb(null, false)
            }
        },
        limits: {
            fieldSize: 1024 * 1024 * 5
        }
    }).single("image")


