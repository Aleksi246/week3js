import {
  addUser,
  findUserById,
  listAllUsers,
  updateUser,
  deleteUser,
} from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;

  const result = updateUser(id, updatedUser);

  if (result) {
    res.status(200);
    res.json({message: 'User updated.', result});
  } else {
    res.sendStatus(404);
  }
};

const deleteUserById = (req, res) => {
  const id = req.params.id;

  const result = deleteUser(id);

  if (result) {
    res.status(200);
    res.json({message: 'User deleted.', result});
  } else {
    res.sendStatus(404);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUserById};
