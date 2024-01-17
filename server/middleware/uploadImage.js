import multer from 'multer'


const storage = multer.diskStorage({
  destination: 'public/download/image',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadImage = multer({ storage });

export default uploadImage;