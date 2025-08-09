const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    //Set stack trace conditionally, only in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,

    // Previous logic, using spread operator
    // ...(process.env.NODE_ENV !== "production" && { error: error.stack }),
  });
};

export default errorHandler;
