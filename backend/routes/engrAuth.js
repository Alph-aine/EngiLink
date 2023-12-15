import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import * as authController from '../controllers/engrAuthController.js';

const router = express.Router();

const {
  registerEngineer,
  loginEngineer,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword
} = authController;

// Register engineer
router.route('/engineer/register').post(registerEngineer);

// login engineer
router.route('/engineer/login').post(loginEngineer);

// get current logged in engineer profile
router.route('/engineer/me').get(isAuthenticated, getMe);

// forgot password
router.route('/engineer/password/forgot').post(forgotPassword);

// reset password
router.route('/engineer/password/reset/:token').put(resetPassword);

// update logged in engineer password
router.route('/engineer/password/update').put(isAuthenticated, updatePassword);

export default router;
