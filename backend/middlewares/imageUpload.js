const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = ""

        if (req.baseUrl.includes("users")) {
            return folder = "users";
        } else if (req.baseUrl.includes("photos")) {
            return folder = "photos";
        };

        cb(null, `uploads/${folder}/`);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor envie imagens png ou jpg."))
        }

        cb(undefined, true);
    }
})

module.exports = { imageUpload };