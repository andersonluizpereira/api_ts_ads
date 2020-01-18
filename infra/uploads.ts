import * as multer from "multer";
import * as path from "path";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..', 'uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const uploads = multer({ storage: storage });

export default uploads;
