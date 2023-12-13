import express from 'express';
import * as authController from '../controllers/empAuthcontroller.js';

const router = express.Router();

const {
  registerEmployer,
  loginEmployer
} = authController;

// Register employer
router.route('/employer/register').post(registerEmployer);

// login employer
router.route('/employer/login').post(loginEmployer);

export default router;
