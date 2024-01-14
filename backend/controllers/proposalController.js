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
<<<<<<< HEAD
=======

    if (req.user.role === 'engineer') {
      const { coverLetter, price } = req.body;
      const proposal = new Proposal({
        job: jobId,
        engineer: req.user.id,
        coverLetter,
        price
      });

      await proposal.save();
      return res.status(201).json(proposal);
    } else {
      return res.status(403).send('Permission denied to apply for the job');
    }
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
>>>>>>> 5125f2fa4e7d279495b52ef76894f5eb0bbd9f2f
});

// Delete a proposal
export const deleteProposal = asyncErrors(async (req, res, next) => {
    try {
	const proposalId = req.params.id;
	const proposal = await Proposal.findById(proposalId);

	if (!proposal) {
	return res.status(404).send('Proposal not found');
    }
<<<<<<< HEAD
	
	if (req.user.role === 'engineer' && req.user.id == proposal.engineer.toString()) {
	await proposal.deleteOne();
	return res.status(201).send('Proposal deleted successfully');
=======

    if (req.user.role === 'engineer' && req.user.id === proposal.engineer.toString()) {
      await proposal.deleteOne();
      return res.status(204).send('Proposal deleted successfully');
>>>>>>> 5125f2fa4e7d279495b52ef76894f5eb0bbd9f2f
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

export const changeProposalStatus = asyncErrors(async (req, res, next) => {
    try {
	req.user.role = 'employer';
	const proposalId = req.params.id;
	const proposal = await Proposal.findById(proposalId);

	if (!proposal) {
	    return res.status(404).send('Proposal not found');
	}

	const role = req.user.role;
	const job = await Job.findbyid(proposal.job.toString())
	
	if (role === 'employer' && job.employer.toString() === req.user.id) {
	    const status = req.query;
	    proposal.status = status;
	    await proposal.save()
	} else {
	    return res.status(403).send('Permission denied to change the status of this proposal');
	}
    } catch (error) {
	next(new ErrorHandler(error.message, 500));
    }
});

//get applications by an engineer
export const myProposals = asyncErrors(async (req, res, next) => {
    try {
	req.user.role === 'engineer';
	if (req.user.role === 'engineer') {
	    const proposals = await Proposal.find({engineer: req.user.id });
	    if (proposals.length === 0) {
	    res.send('You have not posted any proposals.yet');
	} else {
	    return res.json(proposals);}
    } else {
	return res.status(403).send('Permission denied to list proposals, you are not an Engineer');
    }
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
  }
});
