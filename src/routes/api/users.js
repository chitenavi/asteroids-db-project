import express from 'express';
import {
  findAll,
  addList,
  authenticate,
  getUserById,
  updateUserById,
  deleteUserById,
  signup,
} from '../../controllers/usersController';
import jwtAuth from '../../utils/jwtAuth';

const router = express.Router();

/* POST /api/v1/users/auth , Auth user. Login */
router.post('/auth', authenticate);

/* GET /api/v1/users/all , list all users*/
/* POST /api/v1/users/all , create list of users */
router.route('/all').get(jwtAuth(), findAll).post(jwtAuth(), addList);

/* POST /api/v1/users      Create user. Signup */
router.route('/').post(signup);

/* GET /api/v1/users/id */
/* PUT /api/v1/users/id */
/* DELETE /api/v1/users/id */
router
  .route('/:id')
  .get(jwtAuth(), getUserById)
  .put(jwtAuth(), updateUserById)
  .delete(jwtAuth(), deleteUserById);

export default router;
