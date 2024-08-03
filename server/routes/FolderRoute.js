const express = require("express");
const router = express.Router();
const FolderController = require("../controllers/FolderController.js");
const verifyToken = require("../middlewares/verifyToken.js");

//* Route to create a new folder
router.post("/folders", verifyToken, FolderController.createFolder);

//* Route to get all folders for a specific user
router.get(
  "/folders/user/:userId",
  verifyToken,
  FolderController.getFoldersByUser
);

//* Route to get a specific folder by its ID
router.get("/folders/:folderId", verifyToken, FolderController.getFolderById);

//* Route to update a folder by its ID
router.put("/folders/:folderId", verifyToken, FolderController.updateFolder);

//* Route to delete a folder by its ID
router.delete("/folders/:folderId", verifyToken, FolderController.deleteFolder);

module.exports = router;
