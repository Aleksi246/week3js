import {
  addUser,
  findUserById,
  listAllUsers,
  updateUser,
  deleteUser,
} from '../models/user-model.js';

const getUser = async (req, res, next) => {
  try {
    const rows = await listAllUsers();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  try {
    const result = await addUser(req.body);
    if (result && result.user_id) {
      res.status(201).json({message: 'New user added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

const putUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    const result = await updateUser(id, updatedUser);
    if (result) {
      res.status(200).json({message: 'User updated.', result});
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteUser(id);
    if (result) {
      res.status(200).json({message: 'User deleted.', result});
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUserById};
