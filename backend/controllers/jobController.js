import Job from '../models/job.js';
import asyncErrors from '../middlewares/asyncError.js';
import ErrorHandler from '../utils/errorHandler.js';
import { isAuthenticated, authorizeRoles } from '../middlewares/auth.js';

// Define the postJob asynchronous route handler
// Define the postJob asynchronous route handler
const newJobFunc = asyncErrors(async (req, res, next) => {
     try {
        const {
            title,
            description,
            skillsRequired,
            experienceLevel,
            employmentType,
            minSalary,
            maxSalary,
            location,
            postedAt,
            deadline,

        l} = req.body;

        // Create a new Job instance with the provided data
        const newJob = new Job({
            title,
            description,
            skillsRequired,
            experienceLevel,
            employmentType,
            minSalary,
            maxSalary,
            location,
            postedAt,
            deadline,
        });

        // Assign the employer field to the newJob instance
        newJob.employer = req.user;

        // Save the new job to the database
	if (await Job.find(newJob)) {
	    res.status(409).send('Job already exists');} else {
		await newJob.save();
		res.status(201).json(newJob);
	    }
    } catch (error) {
        // If an error occurs, pass it to the error handler middleware
        next(new ErrorHandler(error.message, 400));
    }
});

// Define the postJob route handler
export const postJob = asyncErrors(async (req, res, next) => {
    // Check if the user is an employer
    console.log(req.user.role);
    if (req.user.role !== 'employer') {
        res.status(403).send('Only employers can post jobs');
    } else {
        await newJobFunc(req, res, next);
    }
});
export const deleteJob = asyncErrors(async (req, res, next) => {
    const jobId = req.params.id;

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            res.status(404).send("Job not found");
        }

        // Check if the delete requester is an employer that posted the job
        if (req.user.role === 'employer' && job.employer.toString() === req.user.id) {
            await job.deleteOne();
	    res.status(200).json({ success: true, message: 'Job deleted successfully' });
        } else {
            res.status(403).send('Permission denied to delete the job');
        }
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
});


// get job controller
export const getJobs = asyncErrors(async (req, res, next) => {
    try {
        // Gets a single job if jobId param is present
        const jobId = req.params.id;
        if (jobId) {
            const job = await Job.findById(jobId);
            if (!job) {
                res.status(404).send('Job not found');
            }
            res.json(job);
        } else {
            // Gets all jobs if jobid param is missing
            const jobs = await Job.find();
            res.json(jobs);
        }
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
});



// To search for jobs using some filters or query
export const searchJobs = asyncErrors(async (req, res, next) => {
    try {
        const {
            title,
            skillsRequired,
            experienceLevel,
            employmentType,
            minSalary,
            maxSalary,
            location,
            employer
        } = req.query;

        // A filter object to store the search queries of the user
        const filter = {};
        if (title) filter.title = new RegExp(title, 'i');
        if (skillsRequired) filter.skillsRequired = new RegExp(skillsRequired, 'i');
        if (experienceLevel) filter.experienceLevel = experienceLevel;
        if (employmentType) filter.employmentType = employmentType;
        if (minSalary) filter.minSalary = { $gte: parseInt(minSalary) };
        if (maxSalary) filter.maxSalary = { $lte: parseInt(maxSalary) };
        if (location) filter.location = new RegExp(location, 'i');
        if (employer) filter.employer = new RegExp(employer, 'i');

        const jobs = await Job.find(filter);
        res.json(jobs);
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
});


// Update job controller
export const updateJob = asyncErrors(async (req, res, next) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            res.status(404).send('Job not found');
        }
        // Check if the user is an employer and the owner of the job
        if (req.user.role === 'employer' && job.employer.toString() === req.user.id) {
            const {
                title,
                skillsRequired,
                experienceLevel,
                employmentType,
                minSalary,
                maxSalary,
                location,
                deadline
            } = req.body;
            job.title = title || job.title;
            job.skillsRequired = skillsRequired || job.skillsRequired;
            job.experienceLevel = experienceLevel || job.experienceLevel;
            job.employmentType = employmentType || job.employmentType;
            job.minSalary = minSalary || job.minSalary;
            job.maxSalary = maxSalary || job.maxSalary;
            job.location = location || job.location;
            job.deadline = deadline;

	    await job.save();
	    res.status(200).json(job);
	} else {
            res.status(403).send('Permission denied to update the job');
	}
    } catch (error) {
	next(new ErrorHandler(error.message, 500));
    }
});

/// apply for jobs
export const applyJob = asyncErrors(async (req, res, next) => {
    try {
	const jobId = req.params.id;
	const job = Job.findJobById(jobId);
	if (!job) {
	    res.status(404).send('Job not found');
	}
	if (req.user.role === 'engineer') {
	    const {
		coverLetter,
		price
	    } = req.body;
	    const proposal = new Proposal;
	    proposal.job = jobId;
	    proposal.engineer = req.user.id;
	    proposal.coverLetter = coverLetter;
	    proposal.price = price;
	    proposal.save();
	} else {
	    res.status(403).send('Permission denied to apply for  the job');
	}
    } catch (error) {
	next(new ErrorHandler(error.message, 500));
    }
});

//Delete a proposal
export const deleteProposal = asyncErrors(async (req, res, next) => {
    try {
	const proposalId = req.params.id;
	const proposal = Proposal.findProposalById(proposalId);
	if (!proposal) {
	    res.status(404).send('Proposal not found');
	}
	if (req.user.role === 'engineer' && req.user.id == proposal.user.toString()) {
	    proposal.deleteOne();
	} else {
	    req.status(403).send('Permission denied to delete proposal');
	}
    } catch (error) {
	next(new ErrorHandler(error.message, 500));
    }
});

//get applications for a job
export const getProposals = asyncErrors(async (req, res, next) => {
    try {
	const jobId = req.params.id;
	const job  = Job.findJobById(jobId);
	if (!job) {
	    res.status(404).send('Job not found');
	}
        if (req.user.role === 'employer' && job.employer.toString() === req.user.id) {
	    proposals = Proposal.find({job: jobId});
	    res.json(proposals);
	} else {
	    res.status(403).send('Permission deni0ed to list proposals for this jobs');
	}
    } catch (error) {
	next(new ErrorHandler(error.message, 500));
    }
});

//get a particular application
export const getProposal = asyncErrors(async (req, res, next) => {
    try {
	const proposalId = req.params.id;
	const proposal  = Proposal.findProposalById(proposalId);
	if (!proposal) {
	    res.status(404).send('Proposal not found');
	}
        if ((req.user.role === 'employer' && proposal.job.employer.toString() === req.user.id) || (req.user.role === 'engineer' && proposal.engineer.toString() === req.user.id)) {
	    res.json(proposal)
	} else {
	    res.status(403).send('Permission deni0ed to view this proposal');
	}
    } catch (error) {
	next(new ErrorHandler(error.message, 500));
    }
});
