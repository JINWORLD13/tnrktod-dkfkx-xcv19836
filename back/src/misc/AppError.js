class AppError extends Error {
  constructor(name, message, statusCode ) {
    super(message); 
    this.name = name; 
    this.statusCode = statusCode;
    Error.captureStackTrace(this); 
  }
}
module.exports = AppError;
