import Job from '../models/job.js';
import Proposal from '../models/proposal.js';
import asyncErrors from '../middlewares/asyncError.js';
import ErrorHandler from '../utils/errorHandler.js';

// apply for jobs
export const applyJob = asyncErrors(async (req, res, next) => {
    try {
	const jobId = req.params.id;
	const job = await Job.findById(jobId);

	if (!job) {
	    return res.status(404).send('Job not found');
	}

	const existingApplication = await Proposal.findOne({ job: jobId, engineer: req.user.id });

	if (existingApplication) {
	    return next(new ErrorHandler('You have already applied to this job', 400));
	}
	if (req.user.role === 'engineer') {
	    const { coverLetter, price } = req.body;
	    const proposal = new Proposal({
		job: job.id,
		engineer: req.user.id,
		coverLetter,
		price,
	    });
	    
	    await proposal.save();
	    return res.status(201).json(proposal);
	} else {
	    return res.status(403).send('Permission denied to apply for the job');
	}
    } catch (error) {
	next(new ErrorHandler(error.message, 500));
    }
});

// Delete a proposal
export const deleteProposal = asyncErrors(async (req, res, next) => {
    try {
	const proposalId = req.params.id;
	const proposal = await Proposal.findById(proposalId);

	if (!proposal) {
	return res.status(404).send('Proposal not found');
    }

	if (req.user.role === 'engineer' && req.user.id === proposal.engineer.toString()) {
	    await proposal.deleteOne();
	    return res.status(204).send('Proposal deleted successfully');
	} else {
	    return res.status(403).send('Permission denied to delete proposal');
	}
    } catch (error) {
	next(new ErrorHandler(error.message, 500));
    }
});

// get applications for a job
export const getProposals = asyncErrors(async (req, res, next) => {
    try {
	const jobId = req.params.id;
	const job = await Job.findById(jobId);

	if (!job) {
	return res.status(404).send('Job not found');
    }
	
	if (req.user.role === 'employer' && job.employer.toString() === req.user.id) {
	const proposals = await Proposal.find({ job: jobId });
	return res.json(proposals);
    } else {
	return res.status(403).send('Permission denied to list proposals for this job');
    }
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
  }
});

// get a particular application
export const getProposal = asyncErrors(async (req, res, next) => {
    try {
	const proposalId = req.params.id;
	const proposal = await Proposal.findById(proposalId);

	if (!proposal) {
	    return res.status(404).send('Proposal not found');
	}

	const role = req.user.role;
	
	if ((role === 'employer') || (role === 'engineer' && proposal.engineer.toString() === req.user.id)) {
	    return res.json(proposal);
	} else {
	    return res.status(403).send('Permission denied to view this proposal');
	}
    } catch (error) {
	next(new ErrorHandler(error.message, 500));
    }
});
