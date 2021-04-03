import express from 'express';

import {
  findAll,
  addList,
  createNea,
  getNeaById,
  updateNeaById,
  deleteNeaById,
} from '../../controllers/asteroidsController';

const router = express.Router();

/* GET /api/v1/neas/all */
/* POST /api/v1/neas/all */
router.route('/all').get(findAll).post(addList);

/* POST /api/v1/neas      Create nea */
router.route('/').post(createNea);

/* GET /api/v1/neas/id */
/* PUT /api/v1/neas/id */
/* DELETE /api/v1/neas/id */
router.route('/:id').get(getNeaById).put(updateNeaById).delete(deleteNeaById);

export default router;
