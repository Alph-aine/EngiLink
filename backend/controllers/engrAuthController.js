import Engineer from '../models/engineer.js';
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
