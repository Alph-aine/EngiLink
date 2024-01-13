import Job from '../models/job.js';
import asyncErrors from '../middlewares/asyncError.js';
import ErrorHandler from '../utils/errorHandler.js';

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
      deadline

    } = req.body;

    // Save the new job to the database
	 const existingJob = await Job.findOne({ description, location, experienceLevel, employer: req.user });
    if (existingJob) {
	    res.status(409).send('Job already exists');
    } else {
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
		    deadline
      });

      // Assign the employer field to the newJob instance
      newJob.employer = req.user;

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
  req.user.role = 'employer';
  if (req.user.role !== 'employer') {
    res.status(403).send('Only employers can post jobs');
  } else {
    await newJobFunc(req, res, next);
  }
});
export const deleteJob = asyncErrors(async (req, res, next) => {
  req.user.role = 'employer';
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      res.status(404).send('Job not found');
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
