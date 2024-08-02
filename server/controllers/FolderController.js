const Folder = require("../model/Folder");
const Form = require("../model/Form");

// Controller to handle all Folder related operations
const FolderController = {
  //TODO: Function to create a new folder
  createFolder: async (req, res) => {
    try {
      const { folderName, userId } = req.body;

      // Creating a new folder instance
      const newFolder = new Folder({
        folderName,
        userId,
      });

      // Saving the new folder to the database
      const savedFolder = await newFolder.save();

      // Sending the saved folder as response
      res.status(201).json(savedFolder);
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Function to get all folders for a specific user
  getFoldersByUser: async (req, res) => {
    try {
      const { userId } = req.params;

      // Finding all folders created by the specific user
      const folders = await Folder.find({ userId });

      // Sending the folders as response
      res.status(200).json(folders);
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Function to get a specific folder by its ID
  getFolderById: async (req, res) => {
    try {
      const { folderId } = req.params;

      // Finding the folder by its ID
      const folder = await Folder.findById(folderId);

      if (!folder) {
        // Sending a 404 response if the folder is not found
        return res.status(404).json({ error: "Folder not found" });
      }

      // Sending the found folder as response
      res.status(200).json(folder);
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Function to update a folder by its ID >>>> NOT Required
  updateFolder: async (req, res) => {
    try {
      const { folderId } = req.params;
      const { folderName } = req.body;

      // Finding the folder by its ID and updating its name
      const updatedFolder = await Folder.findByIdAndUpdate(
        folderId,
        { folderName },
        { new: true }
      );

      if (!updatedFolder) {
        // Sending a 404 response if the folder is not found
        return res.status(404).json({ error: "Folder not found" });
      }

      // Sending the updated folder as response
      res.status(200).json(updatedFolder);
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Function to delete a folder by its ID
  // Function to delete a folder by its ID
  deleteFolder: async (req, res) => {
    try {
      const { folderId } = req.params;

      // Finding the folder by its ID and deleting it
      const deletedFolder = await Folder.findByIdAndDelete(folderId);

      if (!deletedFolder) {
        // Sending a 404 response if the folder is not found
        return res.status(404).json({ error: "Folder not found" });
      }

      // Deleting all forms associated with the folder
      await Form.deleteMany({ folderId });

      // Sending a success message as response
      res
        .status(200)
        .json({ message: "Folder and associated forms deleted successfully" });
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = FolderController;
