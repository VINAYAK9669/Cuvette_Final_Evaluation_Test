// TODO: 1]  Import modules
const express = require("express");
const { registerUser, handleLogin } = require("../controllers/userController");
const validateUser = require("../middlewares/validateUser");
const router = express.Router(); //This line initializes a new router object.

// TODO: 2]
router.get("/health", (req, res) => {
  res.json({
    message: "User Route is working fine",
    status: "Working",
  });
});

// TODO: 3]
router.post("/register", validateUser, registerUser);

// TODO:4] Create a Login Route
router.post("/login", handleLogin);

module.exports = router;
