const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Dynamic upload function
function upload(folderName) {
  // Set storage engine
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join('./public', folderName);

      // Check if the directory exists, and create it if not
      fs.access(uploadPath, fs.constants.F_OK, (err) => {
        if (err) {
          // Directory does not exist, create it
          fs.mkdir(uploadPath, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
              return cb(mkdirErr, null);
            }
            cb(null, uploadPath);
          });
        } else {
          // Directory exists
          cb(null, uploadPath);
        }
      });
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

  // File filter 
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;  
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png) and documents (pdf, doc, docx) are allowed!'));
    }
  };

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter
  });
}

module.exports = upload;
