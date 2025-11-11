import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUserById,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);

userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUserById);

export default userRouter;
