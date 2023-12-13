import Engineer from '../models/engineer.js';
import Employer from '../models/employer.js';
import asyncErrors from '../middlewares/asyncError.js';
import sendToken from '../utils/sendcookie.js';
import ErrorHandler from '../utils/errorHandler.js';

// Register new engineer
export const registerEngineer = asyncErrors(async (req, res, next) => {
  const { email, password, firstName, lastName, userName, phoneNumber, highestDegree, fieldOfStudy } = req.body;
  const engineer = new Engineer({
    email,
    password,
    firstName,
    lastName,
    userName,
    phoneNumber,
    highestDegree,
    fieldOfStudy
  });

  try {
    // check if user already exists
    const oldEngineer = await Engineer.findOne({ email });
    if (oldEngineer) {
      return next(new ErrorHandler('A user with this email already exist', 400));
    }

    await engineer.save();
    sendToken(engineer, 200, res);
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});

// Login engineer
export const loginEngineer = asyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check if credentials are provided
  if (!email || !password) {
    return next(new ErrorHandler('Input email and password', 400));
  }

  // check if engineer exists
  const engineer = await Engineer.findOne({ email }).select('+password');
  if (!engineer) return next(new ErrorHandler('Invalid email', 401));

  // validate password
  const isPasswordValid = await engineer.validatePassword(password);
  if (!isPasswordValid) return next(new ErrorHandler('Invalid Password', 401));

  // Return JWT token
  sendToken(engineer, 200, res);
});

// Register new employer

export const registerEmployer = asyncErrors(async (req, res, next) => {
  const { companyName, industry, email, password, location, phoneNumber } = req.body;
  const employer = new Employer({
    email,
    password,
    companyName,
    phoneNumber,
    location,
    industry
  });

  try {
    // check if user already exists
    const oldEmployer = await Employer.findOne({ email });
    if (oldEmployer) {
      return next(new ErrorHandler('A user with this email already exist', 400));
    }

    await employer.save();
    sendToken(employer, 200, res);
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});

// login employer
export const loginEmployer = asyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check if credentials are provided
  if (!email || !password) {
    return next(new ErrorHandler('Input email and password', 400));
  }

  // check if employer exists
  const employer = await Employer.findOne({ email }).select('+password');
  if (!employer) return next(new ErrorHandler('Invalid email', 401));

  // validate password
  const isPasswordValid = await employer.validatePassword(password);
  if (!isPasswordValid) return next(new ErrorHandler('Invalid Password', 401));

  // Return JWT token
  sendToken(employer, 200, res);
});
