// Instantiates an Error handler

class ErrorHandler extends Error {
  constructor (message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
    this.toJSON = function () {
      return {
        error: this.message,
        statusCode: this.statusCode
      };
    };
  }
}

export default ErrorHandler;
