// middleware/errorHandler.js
const errorHandler = (err, res) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
};

module.exports = errorHandler;
