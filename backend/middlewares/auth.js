import jwt from 'jsonwebtoken';
import Engineer from '../models/engineer.js';
import Employer from '../models/employer.js';
import ErrorHandler from '../utils/errorHandler.js';
import asyncErrors from './asyncError.js';

// checks if user is authenticated
export const isAuthenticated = asyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token is not provided.
  if (!token) {
    return next(new ErrorHandler('You need to be logged in to access this resource.', 401));
  }

  try {
    // jwt.verify token and destructure user information
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    // retrieve user info based on user type
    const userType = verifiedToken.userType;
    let user;

    switch (userType) {
      case 'engineer':
        user = await Engineer.findById(verifiedToken.id);
        break;
      case 'employer':
        user = await Employer.findById(verifiedToken.id);
        break;
      default:
        throw new ErrorHandler('Invalid user type in token', 401);
    }

    // attach user info to the request
    req.user = user;
    next();
  } catch (err) {
    next(new ErrorHandler('Invalid Token, 401'));
  }
});

// checks if user is authorized
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return new ErrorHandler(`Role (${req.user.role}) is not authorized to access this resource.`, 403);
    }
  };
};
