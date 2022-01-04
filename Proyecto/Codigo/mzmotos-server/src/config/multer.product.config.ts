import multer from 'multer';
import path from 'path';
import { v4 } from 'uuid';

const typesStorage = multer.diskStorage({
    destination: 'uploads/products',
    filename: (req, file, callback) => {
        callback(null, v4() + path.extname(file.originalname));
    }
});

export const multerPart = multer({ storage: typesStorage });