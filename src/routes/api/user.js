import express from 'express';
import {
  findAll,
  addList,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../../controllers/userController';

const router = express.Router();

/* GET /api/v1/user/all , list all users*/
/* POST /api/v1/user/all , create list of users */
router.route('/all').get(findAll).post(addList);

/* GET /api/v1/user/id */
/* PUT /api/v1/user/id */
/* DELETE /api/v1/user/id */
router
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

export default router;
