import express from 'express';

import { signup, authenticate } from '../../controllers/authController';

const router = express.Router();

/* POST /api/v1/auth/login       Auth user. Login */
router.route('/login').post(authenticate);

/* POST /api/v1/auth/signup      Create user. Signup */
router.route('/signup').post(signup);

export default router;
