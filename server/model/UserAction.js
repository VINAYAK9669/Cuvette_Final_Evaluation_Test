const mongoose = require("mongoose");
const { Schema } = mongoose;

//TODO: Define the schema for form details
const formDetailsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userResponse: {
      type: Schema.Types.Mixed,
      default: "",
    },
    completionStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { _id: false }
);

//TODO: Define the schema for user responses
const userResponseSchema = new Schema(
  {
    userIPAddress: {
      type: String,
      required: true,
    },
    formDetails: [formDetailsSchema],
  },
  { _id: false }
);

//TODO: Define the user action schema
const userActionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  sharedLinks: {
    type: String,
    required: true,
    unique: true,
  },
  completionRate: {
    type: Number,
    required: true,
  },
  userResponse: [userResponseSchema],
});

// Create the UserAction model
const UserAction = mongoose.model("UserAction", userActionSchema);

module.exports = UserAction;
