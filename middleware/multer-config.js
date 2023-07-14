const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const MIME_TYPES = {
  "image/jpg": "webp",
  "image/jpeg": "webp",
  "image/png": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limite à 5 Mo (en octets)
  },
}).single("image");

// Middleware de compression avec Sharp
const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const compressedImagePath = req.file.path + ".compressed";
  try {
    await sharp(req.file.path)
      .toFormat("webp")
      .webp({ quality: 20 })
      .toFile(compressedImagePath);

    // Supprimer le fichier d'origine
    fs.unlinkSync(req.file.path);

    // Renommer le fichier compressé pour écraser l'original
    fs.renameSync(compressedImagePath, req.file.path);
  } catch (err) {
    return next(err);
  }

  next();
};

module.exports = [upload, compressImage];
