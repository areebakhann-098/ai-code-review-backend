import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';
import codeRoutes from './routes/codeRoutes.js';

const app = express();
const upload = multer(); 

app.use(cors());
app.use(bodyParser.json());


app.use('/api', codeRoutes);


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    res.json({
      message: 'File uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed', error });
  }
});

// Optional delete route
app.delete('/delete/:id', async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { app };
