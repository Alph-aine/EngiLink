import Job from '../models/Job';
import asyncErrors from '../middlewares/asyncErrors';
import ErrorHandler from '../utils/errorHandler';
import { isAuthenticated, authorizeRoles } from '../middlewares/auth'

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
            employer,
        } = req.body;

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
            employer,
        });

        // Save the new job to the database
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        // If an error occurs, pass it to the error handler middleware
        next(new ErrorHandler(error.message, 400));
    }
});
// Define the postJob route handler
export const postJob = asyncErrors(async (req, res, next) => {
    isAuthenticated(req, res, async (req, res) => {
	// ensures only employers can post jobs
        if (req.user.role !== 'employer') {
            res.status(403).send('Only employers can post jobs');
        } else {
            await newJobFunc(req, res, next);
        }
    });
});

export const deleteJob = asyncErrors(async (req, res, next) => {
    isAuthenticated(req, res, async (req, res) => {
	const jobId = req.params.jobid;

	try {
	    const  job = await Job.findByid(jobId);

	    if (!job) {
		res.status(404).send("Job not found");
	    }

	    // check if  the delete requeter isan employerthat posted the job
	    if (req.user.role === 'employer' && job.employer.toString() === req.user,userId) {
		await Job.remove();
	    } else {
		res.status(403).send('Permission denied to delete the job');
	    }

	} catch(error) {
	    next(new ErrorHandler(error.message, 400));
	}
    });
})

// get job controller
export const  getJobs = asyncErrors(async (req, res, next) => {
    isAuthenticated(req, res, async (req, res) => {
	try {
	    // gets a single job if jobId param is present
	    const jobId = req.params.jobId;
	    if (jobId) {
		const job = Job.findById(jobId);
		if (!job) {
		    re.status(404).send('Job not found');
		}
		res.json(job);
	    } else {
		// gets all jobs if jobid param is missing
		const jobs = await Job.find();
		res.json(jobs);
	    }
	} catch (error) {
	    next(new ErrorHandler(error.message, 500));
	}
    });
});


// To serach for jobs using sime filters or query
export const searchJobs = asyncErrors(async (req, res, next) => {
    isAuthenticated(req, res, async (req, res) => {
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
/	    // A filter object to store the search queries of the user
	    const filter = {};
	    if (title) filter.title = new RegExp(title, 'i');
	    if skillsRequired filter.skillsRequired = new RegExp(skillsRequired, 'i');
	    if experienceLevel filter.experienceLevel = experienceLevel;
	    if employmentType filter.employmentType = employmentType;
	    if minSalary filter.minSalary = { $gte: parseInt(minSalary) };
	    if maxSalary filter.maxSalary = { $lte: parseInt(maxSalary) };
	    if location filter.location = new RegExp(location, 'i');
	    if employer filter.employer = new RegExp(employer, 'i');

	    const jobs = await Job.find(filter);
	    res.json(jobs);
	} catch(error) {
	    next(new ErrorHandler(error.message, 500));
	}
    });
});

// update job controller
export const updateJob = asyncErrors(async (req, res, next) => {
    isAuthenticated(req, res, async (req, res) => {
	try {
	    const jobId = req.params.jobId;
	    const job = await Job.findById(jobId);
	    if (!job) {
		res.status(404).send('Job not found');
	    }
	    if (req.user.role === 'employer' && job.employer.toString() === req.user.userId) {
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
		job.deadline = deadline || job.deadline;
		await job.save();
		res.status(200).json(job);
	    } else {
		res.status(403).send('Permission denied to update the job');
	    }
	} catch (error) {
	    next(new ErrorHandler(error.message, 500));
	}
    });
});
