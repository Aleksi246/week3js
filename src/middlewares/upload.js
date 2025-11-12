import sharp from 'sharp';
import path from 'path';

const createThumbnail = async (req, res, next) => {
  try {
    if (!req.file) {
      next();
      return;
    }

    // multer stores the uploaded file path in req.file.path
    const originalPath = req.file.path;
    const uploadsDir = path.dirname(originalPath);

    // create thumbnail filename: originalfilename + _thumb.png
    // multer's req.file.filename is a generated name without extension when using `dest`
    const thumbFilename = `${req.file.filename}_thumb.png`;
    const thumbPath = path.join(uploadsDir, thumbFilename);

    // create 160x160 png thumbnail using sharp (promise-based)
    await sharp(originalPath)
      .resize(160, 160, {fit: 'cover'})
      .png()
      .toFile(thumbPath);

    // attach thumbnail info to request so later middleware/controllers can use it
    req.file.thumbnail = {
      filename: thumbFilename,
      path: thumbPath,
    };

    next();
  } catch (err) {
    next(err);
  }
};

export {createThumbnail};
