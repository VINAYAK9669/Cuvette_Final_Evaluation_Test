const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema for form details
const formDetailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userResponse: {
    type: Schema.Types.Mixed,
    default: null,
  },
  completionStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

// Schema for user responses
const userResponseSchema = new Schema({
  RandomId: {
    type: String,
    required: true,
  },
  formDetails: [formDetailsSchema],
});

// Schema for shared link details
const sharedLinkDetailsSchema = new Schema({
  sharedLink: {
    type: Schema.Types.Mixed,
    required: true,
    unique: true,
  },
  totalInputs: {
    type: Number,
    required: true,
  },
  theme: { type: String, required: true, default: "#FFFFFF" },
  formFillerData: [userResponseSchema],
  formDetails: [
    {
      inputType: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      showValue: {
        type: String,
        default: "",
      },
    },
  ],
});

// Schema for user actions
const userActionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  LinkDetails: [sharedLinkDetailsSchema],
});

const UserAction = mongoose.model("UserAction", userActionSchema);

module.exports = UserAction;
