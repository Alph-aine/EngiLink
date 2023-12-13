import express from 'express';
// import { isAuthenticated, authorizeRoles } from '../middlewares/auth';
import * as authController from '../controllers/engrAuthController.js';

const router = express.Router();

const {
  registerEngineer,
  loginEngineer
} = authController;

// Register engineer
router.route('/engineer/register').post(registerEngineer);

// login engineer
router.route('/engineer/login').post(loginEngineer);

export default router;
