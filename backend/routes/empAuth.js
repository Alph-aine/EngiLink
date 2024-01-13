import express from 'express';
import * as authController from '../controllers/empAuthcontroller.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

const {
  registerEmployer,
  loginEmployer,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
  getEmployerById,
  getEmployerByCompanyName,
  deleteEmployerAccount,
  getAllJobs
} = authController;

// Register employer
router.route('/employer/register').post(registerEmployer);

// login employer
router.route('/employer/login').post(loginEmployer);

// get currently logged in employer profile
router.route('/employer/me').get(isAuthenticated, getMe);

// forgot password
router.route('/employer/password/forgot').post(forgotPassword);

// reset password, works with forgot password
router.route('/employer/password/reset/:token').put(resetPassword);

// update logged in employer password
router.route('/employer/password/update').put(isAuthenticated, updatePassword);

// get employer by id
router.route('/employer/id/:id').get(isAuthenticated, getEmployerById);
// delete employer account
router.route('/employer/id/:id').delete(isAuthenticated, deleteEmployerAccount);

// get employer by companyName
router.route('/employer/company/:companyName').get(isAuthenticated, getEmployerByCompanyName);

// get all jobs posted by an employer
router.route('/employer/:id/jobs').get(isAuthenticated, getAllJobs);

export default router;
