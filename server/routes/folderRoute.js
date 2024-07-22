const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");
const ValidateCurToken = require("../middlewares/verifyToken");

//* Route to create a new folder
router.post("/folders", ValidateCurToken, folderController.createFolder);

//* Route to get all folders
router.get(
  "/folders/by-user",
  ValidateCurToken,
  folderController.getAllFolders
);

//* Route to get a single folder by ID
router.get("/folders/:id", ValidateCurToken, folderController.getFolderById);

//* Route to delete a folder by ID
router.delete("/folders/:id", folderController.deleteFolder);

//* Route to create a subfolder with form-data
router.post(
  "/folders/subfolder",
  folderController.upload.array("files"),
  folderController.createSubfolder
);

module.exports = router;
