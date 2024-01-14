import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import * as proposalController from '../controllers/proposalController.js';

const router = express.Router();
const {
    applyJob,
    getProposal,
    getProposals,
    deleteProposal,
} = proposalController;

// Apply for a job
router.route('/jobs/:id/apply').post(isAuthenticated, applyJob);

// get proposals for a job
router.route('/jobs/:id/proposals').get(isAuthenticated, getProposals);

// get a specific proposal
router.route('/proposals/:id').get(isAuthenticated, getProposal);

// delete a job based on id
router.route('/proposals/:id').delete(isAuthenticated, deleteProposal);
export default router;
