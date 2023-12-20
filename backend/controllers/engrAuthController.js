import Engineer from '../models/engineer.js';
import asyncErrors from '../middlewares/asyncError.js';
import sendToken from '../utils/sendcookie.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendEmail from '../utils/mailer.js';
import crypto from 'crypto';

/**
 * Contain controllers specific to engineers
 */

// Register new engineer
export const registerEngineer = asyncErrors(async (req, res, next) => {
  const {
    email, password, firstName, lastName, userName, phoneNumber, highestDegree,
    fieldOfStudy, skills, certifications, bio, experienceLevel, resume, portfolio, desiredSalary
  } = req.body;
  const engineer = new Engineer({
    email,
    password,
    firstName,
    lastName,
    userName,
    phoneNumber,
    highestDegree,
    fieldOfStudy,
    skills,
    certifications,
    bio,
    experienceLevel,
    resume,
    portfolio,
    desiredSalary
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

// get currently login engineer
export const getMe = asyncErrors(async (req, res, next) => {
  const engineer = await Engineer.findById(req.user.id);
  res.status(200).json({
    success: true,
    engineer
  });
});

// Forgot password.
export const forgotPassword = asyncErrors(async (req, res, next) => {
  const engineer = await Engineer.findOne({ email: req.body.email });

  // Check if email exists.
  if (!engineer) {
    return next(new ErrorHandler('Engineer with this email address not found', 404));
  }

  // Get reset token.
  const resetToken = engineer.getResetPasswordToken();

  await engineer.save({ validateBeforeSave: false });

  // Create Reset Password URL.
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/engineer/password/reset/${resetToken}`;
  const message = `Your password reset token is:\n\n${resetURL}\n\nIf you did not request for a password reset, kindly ignore this email.`;

  try {
    await sendEmail({
      email: engineer.email,
      subject: 'Engilink Password Recovery',
      message
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${engineer.email}`
    });
  } catch (error) {
    engineer.resetPasswordToken = undefined;
    engineer.resetPasswordExpire = undefined;

    await engineer.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password.
export const resetPassword = asyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const engineer = await Engineer.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!engineer) {
    return next(new ErrorHandler('Invalid or expired token', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Passwords do not match', 400));
  }

  // Set new password.
  engineer.password = req.body.password;
  engineer.resetPasswordToken = undefined;
  engineer.resetPasswordExpire = undefined;

  await engineer.save();

  sendToken(engineer, 200, res);
});

// Update or change password of currently logged in engineer.
export const updatePassword = asyncErrors(async (req, res, next) => {
  const engineer = await Engineer.findById(req.user.id).select('+password');

  // Check if old password is correct.
  const isPasswordValid = await engineer.validatePassword(req.body.oldPassword);
  if (!isPasswordValid) {
    return next(new ErrorHandler('Incorrect old password', 400));
  }

  // Check if new password is same as old password.
  if (req.body.newPassword === req.body.oldPassword) {
    return next(new ErrorHandler('New password is same as old password', 400));
  }

  // Set new password.
  engineer.password = req.body.newPassword;
  await engineer.save();

  sendToken(engineer, 200, res);
});

// Gets engineer by id
export const getEngineerById = asyncErrors(async (req, res, next) => {
  const engineer = await Engineer.findById(req.params.id);

  if (!engineer) {
    return next(new ErrorHandler('Engineer does not exist', 404));
  }
  res.status(200).json({
    success: true,
    engineer
  });
});

// Get engineer by userName
export const getEngineerByUserName = asyncErrors(async (req, res, next) => {
  const engineer = await Engineer.findOne({ userName: req.params.userName });

  if (!engineer) {
    return next(new ErrorHandler('Engineer does not exist', 404));
  }
  res.status(200).json({
    success: true,
    engineer
  });
});

// Delete engineer account
export const deleteEngineerAccount = asyncErrors(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new ErrorHandler('You are not authorized to perform this action', 403));
  }
  const engineer = await Engineer.findById(req.params.id);
  if (!engineer) {
    return next(new ErrorHandler('Engineer not found', 404));
  }

  await engineer.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: 'Account deleted successfully'
  });
});
