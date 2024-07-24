const Folder = require("../model/Folder");
const User = require("../model/User");
const { upload } = require("../middlewares/multer");

// TODO: Create a folder
exports.createFolder = async (req, res) => {
  try {
    const { name = "", parentFolder, createdBy } = req.body;

    //* Check if the createdBy field is present
    if (!createdBy) {
      return res
        .status(400)
        .json({ message: "user Identification is required" });
    }

    //* Create a new folder
    const folder = new Folder({ name, parentFolder, createdBy });
    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create folder", error });
  }
};

//TODO: Get all folders
// exports.getAllFolders = async (req, res) => {
//   try {
//     const { userId } = req.query;

//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User does not exist" });
//     }

//     // Get folders created by the user and populate subfolders
//     const folders = await Folder.find({ createdBy: userId }).populate({
//       path: "subfolders",
//       populate: { path: "subfolders" }, // Populate nested subfolders if needed
//     });

//     res.status(200).json(folders);
//   } catch (error) {
//     console.error("Error getting folders:", error); // Log the error for debugging
//     res.status(500).json({
//       message: "Failed to get folders",
//       error: error.message || error,
//     });
//   }
// };
exports.getAllFolders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Get folders created by the user and populate subfolders
    const folders = await Folder.find({ createdBy: userId }).populate({
      path: "subfolders",
      populate: { path: "subfolders" }, // Populate nested subfolders if needed
    });

    // Categorize folders
    const titledFolders = folders.filter(
      (folder) => folder.name && folder.name.trim() !== ""
    );
    const untitledFolders = folders.filter(
      (folder) => !folder.name || folder.name.trim() === ""
    );

    res.status(200).json({
      titledFolders,
      untitledFolders,
    });
  } catch (error) {
    console.error("Error getting folders:", error); // Log the error for debugging
    res.status(500).json({
      message: "Failed to get folders",
      error: error.message || error,
    });
  }
};

//TODO: Get a single folder by ID
exports.getFolderById = async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findById(id);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.status(200).json(folder);
  } catch (error) {
    res.status(500).json({ message: "Failed to get folder", error });
  }
};

//TODO: Delete a folder by ID
exports.deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findByIdAndDelete(id);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete folder", error });
  }
};

// Controller to create a subfolder with form-data
exports.createSubfolder = async (req, res) => {
  try {
    // Access form-data fields
    const { name, parentFolderId, createdBy } = req.body;

    // Validate parent folder ID format
    if (!parentFolderId.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ message: "Invalid parent folder ID format" });
    }

    // Find the parent folder
    const parentFolder = await Folder.findById(parentFolderId);
    if (!parentFolder) {
      return res.status(404).json({ message: "Parent folder not found" });
    }

    // Create the subfolder
    const subfolder = new Folder({
      name: name || "Untitled Folder",
      parentFolder: parentFolderId,
      createdBy,
    });

    // Save files if any
    if (req.files && req.files.length > 0) {
      // Add logic to handle files
      // For example, you could add file paths to the subfolder or save them to a database
      subfolder.files = req.files.map((file) => file.path); // Adjust based on your schema
    }

    await subfolder.save();

    // Update the parent folder's subfolders array
    parentFolder.subfolders.push(subfolder._id);
    await parentFolder.save();

    res.status(201).json(subfolder);
  } catch (error) {
    console.error("Error creating subfolder:", error); // Log the error for debugging
    res.status(500).json({
      message: "Failed to create subfolder",
      error: error.message || error,
    });
  }
};
// Export multer upload middleware
exports.upload = upload;
