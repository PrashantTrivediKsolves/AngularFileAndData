import express from 'express';

import cors from 'cors';

// import multer from 'multer';

import path from 'path';

import cookieParser from 'cookie-parser';

import bodyParser from 'body-parser';

// import { newuserModelFile } from './postgres/userFile.js';
import { connectionUserFile } from "./postgres/userFile.js";

import  routerFile from "./views/userFile.js"

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app=express();

const PORT=8000;

app.use(cors({
    origin:"*"
}));

// Set up Multer for file upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     }
//   });
  
//   const upload = multer({ storage: storage });
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//   app.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//       const {username}=req.body;
//       if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//       }
//       const { originalname, path } = req.file;
  
//       // Create a new record in the 'files' table using Sequelize
//       const newFile = await newuserModelFile.create({ name: originalname, path: path ,username:username});
  
//       res.json(newFile);
     
//     } catch (err) {
//       console.error('Error uploading file:', err);
//       res.status(500).json({ message: 'File upload failed' });
//     }
//   });

//   app.get('/uploads', async (req, res) => {
//     try {
//       const files = await newuserModelFile.findAll();
//       res.json(files);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       res.status(500).json({ message: 'Failed to fetch files' });
//     }
//   });
  
  app.use(express.json());
  
  app.use(bodyParser.urlencoded({ extended: false }));
  
  app.use(bodyParser.json());
  
  app.use(cookieParser());

  app.use(routerFile);

  app.listen(PORT,()=>
    {
        console.log(`server is running at port ${PORT}`);
    })
    
  

// angular--file

  connectionUserFile();