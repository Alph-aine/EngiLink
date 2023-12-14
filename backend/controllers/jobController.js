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
