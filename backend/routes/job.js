import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import * as jobController from '../controllers/jobController';

const router = express.Router();
const {
    postJob;
    getJob,
    getJobs,
    deleteJob,
    updateJob,
    searchJob
} = jobController;

// post a job
router.route('/jobs').post(isAuthenticated, postJob);

// get jobs 
router.route('/jobs').get(isAuthenticated, getJobs);

// get a job usng id
router.route('/jobs/:id').get(isAuthenticated, getJob);

// delete a job based on id
router.route('/jobs/:id').delete(isAuthenticated, deleteJob);

// update a job
router.route('/jobs/:id').put(isAuthenticated, updateJob);

// search for jibs using filters (search query)
router.route('/jobs/search').get(isAuthenticated, searchJobs);

export default router;
