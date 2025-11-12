import {
  addCat,
  findCatById,
  listAllCats,
  updateCat,
  deleteCat1,
} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  // Debug: print content-type and incoming file/body to diagnose multer issues
  console.log('--- POST /cats incoming ---');
  console.log('content-type:', req.headers['content-type']);
  console.log('req.file (multer):', req.file);
  console.log('req.body:', req.body);

  const catData = {
    ...req.body,
    filename: req.file ? req.file.filename : null,
  };

  const result = addCat(catData);
  if (result.cat_id) {
    console.log(req.body);
    console.log(req.file);
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  const id = req.params.id;
  const updatedCat = req.body;
  // not implemented in this example, this is homework
  const result = updateCat(id, updatedCat);
  if (result) {
    res.status(200);
    res.json({message: 'Cat item updated.'});
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = (req, res) => {
  const id = req.params.id;

  // not implemented in this example, this is homework
  const result = deleteCat1(id);
  if (result) {
    res.status(200);
    res.json({message: 'Cat item deleted.'});
  } else {
    res.sendStatus(404);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat};
