import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import * as jobController from '../controllers/jobController.js';

const router = express.Router();
const {
  postJob,
  getJobs,
  deleteJob,
  updateJob,
  searchJobs
} = jobController;

// post a job
router.route('/jobs').post(isAuthenticated, postJob);

// get jobs
router.route('/jobs').get(isAuthenticated, getJobs);

// get a job usng id
router.route('/jobs/:id').get(isAuthenticated, getJobs);

// delete a job based on id
router.route('/jobs/:id').delete(isAuthenticated, deleteJob);

// update a job
router.route('/jobs/:id').put(isAuthenticated, updateJob);

// search for jibs using filters (search query)
router.route('/search').get(isAuthenticated, searchJobs);

export default router;
