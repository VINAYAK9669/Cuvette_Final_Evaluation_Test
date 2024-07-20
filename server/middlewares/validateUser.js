// validateUser.js
const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please provide a valid email address",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  next();
};

module.exports = validateUser;
