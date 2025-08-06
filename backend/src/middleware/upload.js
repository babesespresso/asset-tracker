const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = './uploads/';
    
    if (file.fieldname === 'assetImages') {
      uploadPath += 'assets/images/';
    } else if (file.fieldname === 'assetDocuments') {
      uploadPath += 'assets/documents/';
    } else if (file.fieldname === 'reportFiles') {
      uploadPath += 'reports/';
    } else if (file.fieldname === 'userAvatar') {
      uploadPath += 'users/avatars/';
    }
    
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp/;
  const allowedDocumentTypes = /pdf|doc|docx|xls|xlsx|txt/;
  
  if (file.fieldname === 'assetImages' || file.fieldname === 'userAvatar') {
    if (allowedImageTypes.test(path.extname(file.originalname).toLowerCase()) && 
        allowedImageTypes.test(file.mimetype)) {
      return cb(null, true);
    }
  } else if (file.fieldname === 'assetDocuments' || file.fieldname === 'reportFiles') {
    if (allowedDocumentTypes.test(path.extname(file.originalname).toLowerCase()) || 
        allowedImageTypes.test(path.extname(file.originalname).toLowerCase())) {
      return cb(null, true);
    }
  }
  
  cb(new Error('Invalid file type'));
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760
  },
  fileFilter: fileFilter
});

module.exports = upload;
