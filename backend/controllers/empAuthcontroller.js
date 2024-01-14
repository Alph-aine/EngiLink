import Employer from '../models/employer.js';
import asyncErrors from '../middlewares/asyncError.js';
import sendToken from '../utils/sendcookie.js';
import ErrorHandler from '../utils/errorHandler.js';
import crypto from 'crypto';
import sendEmail from '../utils/mailer.js';

/**
 * Contains controllers specific to Employers
 */

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

// get currently login employer
export const getMe = asyncErrors(async (req, res, next) => {
  const employer = await Employer.findById(req.user.id);
  res.status(200).json({
    success: true,
    employer
  });
});

// Forgot password.
export const forgotPassword = asyncErrors(async (req, res, next) => {
  const employer = await Employer.findOne({ email: req.body.email });

  // Check if email exists.
  if (!employer) {
    return next(new ErrorHandler('Employer with this email address not found', 404));
  }

  // Get reset token.
  const resetToken = employer.getResetPasswordToken();

  await employer.save({ validateBeforeSave: false });

  // Create Reset Password URL.
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/employer/password/reset/${resetToken}`;
  const message = `Your password reset token is:\n\n${resetURL}\n\nIf you did not request for a password reset, kindly ignore this email.`;

  try {
    await sendEmail({
      email: employer.email,
      subject: 'Engilink Password Recovery',
      message
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${employer.email}`
    });
  } catch (error) {
    employer.resetPasswordToken = undefined;
    employer.resetPasswordExpire = undefined;

    await employer.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password.
export const resetPassword = asyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const employer = await Employer.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!employer) {
    return next(new ErrorHandler('Invalid or expired token', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Passwords do not match', 400));
  }

  // Set new password.
  employer.password = req.body.password;
  employer.resetPasswordToken = undefined;
  employer.resetPasswordExpire = undefined;

  await employer.save();

  sendToken(employer, 200, res);
});

// Update or change password of currently logged in employer.
export const updatePassword = asyncErrors(async (req, res, next) => {
  const employer = await Employer.findById(req.user.id).select('+password');

  // Check if old password is correct.
  const isPasswordValid = await employer.validatePassword(req.body.oldPassword);
  if (!isPasswordValid) {
    return next(new ErrorHandler('Incorrect old password', 400));
  }

  // Check if new password is same as old password.
  if (req.body.newPassword === req.body.oldPassword) {
    return next(new ErrorHandler('New password is same as old password', 400));
  }

  // Set new password.
  employer.password = req.body.newPassword;
  await employer.save();

  sendToken(employer, 200, res);
});

// Gets employer by id
export const getEmployerById = asyncErrors(async (req, res, next) => {
  const employer = await Employer.findById(req.params.id);

  if (!employer) {
    return next(new ErrorHandler('Employer does not exist', 404));
  }
  res.status(200).json({
    success: true,
    employer
  });
});

// Get employer by companyName
export const getEmployerByCompanyName = asyncErrors(async (req, res, next) => {
  const decodedCompanyName = decodeURIComponent(req.params.companyName);
  const employer = await Employer.findOne({ companyName: decodedCompanyName });

  if (!employer) {
    return next(new ErrorHandler('Employer does not exist', 404));
  }
  res.status(200).json({
    success: true,
    employer
  });
});

// Delete employer account
export const deleteEmployerAccount = asyncErrors(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new ErrorHandler('You are not authorized to perform this action', 403));
  }
  const employer = await Employer.findById(req.params.id);
  if (!employer) {
    return next(new ErrorHandler('Employer not found', 404));
  }

  await employer.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: 'Account deleted successfully'
  });
});

// get all jobs posted by employer
export const getAllJobs = asyncErrors(async (req, res, next) => {
  try {
    const employer = await Employer.findById(req.params.id).populate('jobPosted');
    if (!employer) {
      return next(new ErrorHandler('Employer not found', 404));
    }
    const jobsPosted = employer.jobPosted;
    res.status(200).json({
      success: true,
      jobsPosted
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 400));
  }
});
