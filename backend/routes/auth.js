import express from 'express';
// import { isAuthenticated, authorizeRoles } from '../middlewares/auth';
import * as authController from '../controllers/authController.js';

const router = express.Router();

const {
  registerEngineer,
  loginEngineer,
  registerEmployer,
  loginEmployer
} = authController;

// Register engineer
router.route('/engineer/register').post(registerEngineer);

// login engineer
router.route('/engineer/login').post(loginEngineer);

// Register employer
router.route('/employer/register').post(registerEmployer);

// login employer
router.route('/employer/login').post(loginEmployer);

export default router;
