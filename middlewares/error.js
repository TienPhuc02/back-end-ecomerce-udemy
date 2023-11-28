import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Interval Server Error",
  };

  //handle mongo id error
  if (err.name === "CastError") {
    const message = `Resource not found.Invalid ${err?.path}`;
    error = new ErrorHandler(message, 404);
  }

  //handle validetion error
  if (err.name === "validatoError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 404);
  }
  if (process.env.NODE_ENV.trim() === "DEVELOPMENT") {
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }
  if (process.env.NODE_ENV.trim() === "PRODUCTION") {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};
