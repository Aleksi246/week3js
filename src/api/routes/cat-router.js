import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';
import {createThumbnail} from '../../middlewares/upload.js';

const catRouter = express.Router();

// ensure uploads directory exists and use an absolute path so multer writes
// to the intended project-level `uploads/` directory regardless of cwd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// cat-router is at src/api/routes -> go up three levels to project root
const projectRoot = path.resolve(__dirname, '../../..');
const uploadsDir = path.join(projectRoot, 'uploads');
fs.mkdirSync(uploadsDir, {recursive: true});
const upload = multer({dest: uploadsDir});

// multer will parse multipart/form-data and populate req.file for single file uploads
// the form field name expected by multer is 'file' (change here if you use another name)
// route: upload file, then create thumbnail, then handle postCat
catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('file'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
