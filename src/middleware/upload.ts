import multer from "multer";
import path from "path";

const storage = multer.memoryStorage(); //keeps file in memory (no disk write)

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()  //path.extname(...) extracts extension ".jpg".
    );
    const mimetype = allowedTypes.test(file.mimetype);  //When someone uploads a file (like a pizza image), the browser sends some info along with it including the MIME type. file.mimetype is a string that tells you what kind of file it is according to the browser. e.g, uploaded file "pepperoni.jpg" so file.mimetype is "image/jpeg".

     if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images Only (jpeg, jpg, png, webp)'));
    }
  },
  limits: {
     fileSize: 5 * 1024 * 1024 //5MB max
  }
});
