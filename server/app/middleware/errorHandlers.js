const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.json({
    message: error.message,
    //Set stack trace conditionally, only in development mode using spread operator
    ...(process.env.NODE_ENV !== "production" && { error: error.stack }),
  });
};

export default errorHandler;
