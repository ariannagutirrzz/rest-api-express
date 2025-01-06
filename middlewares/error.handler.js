function logErrors(error, req, res, next) {
  console.error(`Method: ${req.method}, Path: ${req.originalUrl}`);
  console.error(error);
  next(error);
}

function errorHandler(error, req, res, next) {
  const { message, stack } = error;
  res.status(500).json({ message, stack });
}

module.exports = { errorHandler, logErrors };
