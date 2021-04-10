import express from 'express';

import {
  findAll,
  addList,
  createCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} from '../../controllers/customerController';

const router = express.Router();

/* GET /api/v1/customer/all */
/* POST /api/v1/customer/all */
router.route('/all').get(findAll).post(addList);

/* POST /api/v1/customer  */
router.route('/').post(createCustomer);

/* GET /api/v1/customer/:id */
/* PUT /api/v1/customer/:id */
/* DELETE /api/v1/customer/:id */
router
  .route('/:id')
  .get(getCustomerById)
  .put(updateCustomerById)
  .delete(deleteCustomerById);

export default router;
