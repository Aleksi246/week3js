import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
  listCatsByUser,
} from '../models/cat-model.js';

const getCat = async (req, res, next) => {
  try {
    const rows = await listAllCats();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

const getCatById = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);
    if (cat) {
      res.json(cat);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const postCat = async (req, res, next) => {
  try {
    console.log('--- POST /cats incoming ---');
    console.log('content-type:', req.headers['content-type']);
    console.log('req.file (multer):', req.file);
    console.log('req.body:', req.body);

    const catData = {
      ...req.body,
      filename: req.file ? req.file.filename : '',
    };

    const result = await addCat(catData);
    if (result && result.cat_id) {
      res.status(201).json({message: 'New cat added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

const putCat = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedCat = req.body;
    const result = await modifyCat(updatedCat, id);
    if (result) {
      res.status(200).json({message: 'Cat item updated.'});
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await removeCat(id);
    if (result) {
      res.status(200).json({message: 'Cat item deleted.'});
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const getCatsByUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const rows = await listCatsByUser(userId);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatsByUser};
