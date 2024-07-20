const mongoose = require("mongoose");

// TODO :  Create a Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Export the User model, making it available for import in other files
module.exports = mongoose.model("User", userSchema);
