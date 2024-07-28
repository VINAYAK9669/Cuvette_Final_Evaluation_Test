const express = require("express");
const router = express.Router();
const userActionController = require("../controllers/userActionController");

//TODO: Route to create a new user action
router.post("/add-new-sharedLink/", userActionController.addNewSharedLink);

// TODO: Route to add formFiller Registration details to the user
router.post(
  "/add-new-user-to-shared-link/",
  userActionController.addUserToFormFillerData
);

// TODO: Route to add FormFiller response to the FormDeatils
router.post(
  "/add-new-user-form-details/",
  userActionController.addUserInputToFormDetails
);

// TODO: Get all the details related to shared link
router.get(
  "/get-shared-link-details/",
  userActionController.getUserActionsBySharedLink
);

module.exports = router;
