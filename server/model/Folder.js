const mongoose = require("mongoose");

// Define a schema for folders
const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Untitled Folder",
  },
  parentFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  files: [
    {
      type: String, // Store file paths as strings
    },
  ],
  subfolders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],
});

// Create a model based on the schema
const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
