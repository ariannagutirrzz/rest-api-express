require('dotenv').config();

function logErrors(error, req, res, next) {
  const { message, stack } = error;
  const { method, originalUrl } = req;

  if (process.env.NODE_ENV === 'development') {
    console.error(`Method: ${method}, Path: ${originalUrl}`);
    console.error(error, stack);
  } else {
    console.error(message);
  }
  next(error);
}

function errorHandler(error, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    const { message, stack } = error;
    res.status(500).json({ message, stack });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

module.exports = { errorHandler, logErrors };
