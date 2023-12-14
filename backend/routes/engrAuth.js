import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import * as authController from '../controllers/engrAuthController.js';

const router = express.Router();

const {
  registerEngineer,
  loginEngineer,
  getMe
} = authController;

// Register engineer
router.route('/engineer/register').post(registerEngineer);

// login engineer
router.route('/engineer/login').post(loginEngineer);

// get current logged in user
router.route('/engineer/me').get(isAuthenticated, getMe);

export default router;
