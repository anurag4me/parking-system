const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "BACKEND SERVER ERROR";
  const extraDetails = err.extraDetails || "Error from Backend Happened";

  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
