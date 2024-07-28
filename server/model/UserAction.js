const mongoose = require("mongoose");
const { Schema } = mongoose;

//* Schema for form details
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
});

//* Schema for user responses
const userResponseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  formDetails: [formDetailsSchema],
});

//* Schema for user actions
const sharedLinkDetails = new Schema({
  userId: {
    type: String,
    required: true,
  },

  LinkDetails: [
    {
      sharedLink: {
        type: String,
        required: true,
        unique: true,
      },
      totalInputs: {
        type: Number,
        required: true,
      },
      formFillerData: [userResponseSchema],
    },
  ],
});

const UserAction = mongoose.model("UserAction", sharedLinkDetails);

module.exports = UserAction;
