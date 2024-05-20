import  express from 'express';
import multer from 'multer';
import { newuserModelFile } from '../postgres/userFile.js'
const routerFile = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage: storage });

  routerFile.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const {username}=req.body;
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const { originalname, path } = req.file;
  
      // Create a new record in the 'files' table using Sequelize
      const newFile = await newuserModelFile.create({ name: originalname, path: path ,username:username});
  
      res.json(newFile);
     
    } catch (err) {
      console.error('Error uploading file:', err);
      res.status(500).json({ message: 'File upload failed' });
    }
  });

  routerFile.get('/uploads', async (req, res) => {
    try {
      const files = await newuserModelFile.findAll();
      res.json(files);
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ message: 'Failed to fetch files' });
    }
  });

  export default routerFile;