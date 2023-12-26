import ErrorHandler from '../utils/errorHandler.js';

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  let error = { ...err };
  error.message = err.message;

  console.error(err.stack);

  // handle mongoose ObjectId errors
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  // handles validatiion Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorHandler(message, 400);
  }

  // handles invalid jwtoken error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Try again';
    error = new ErrorHandler(message, 400);
  }

  // Handle expired JWT token errors.
  if (err.name === 'TokenExpiredError') {
    const message = 'Your token has expired. Login again.';
    error = new ErrorHandler(message, 400);
  }

  // Handle generic errors.
  res.status(error.statusCode).json({
    success: false,
    message: error.message || 'Something went wrong with the server.'
  });
};

export default errorHandler;
