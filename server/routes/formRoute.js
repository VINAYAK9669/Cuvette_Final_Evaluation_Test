const express = require("express");
const router = express.Router();
const FormController = require("../controllers/FormController");
const verifyToken = require("../middlewares/verifyToken");

//* Route to create a new form
router.post("/createform", verifyToken, FormController.createForm);

//* Route to get all forms for a specific user
router.get("/user/form/:userId", verifyToken, FormController.getFormsByUser);

//* Route to get all forms in a specific folder
router.get(
  "/folder/forms/:userId/:folderId?",
  verifyToken,
  FormController.getFormsByFolder
);

// *Route to get a specific form by its ID
router.get("/form/:formId", verifyToken, FormController.getFormById);

//* Route to update a form by its ID
router.put("/form/update/:formId", verifyToken, FormController.updateForm);

//* Route to delete a form by its ID
router.delete("/form/delete/:formId", verifyToken, FormController.deleteForm);

//* Route to update form details of a specific form
router.put("/form/update/:formId", FormController.updateFormDetails);

// * Route to get forms without the folderid
router.get(
  "/form/withoutfolderId/:userId",
  FormController.getFormsWithoutFolder
);
// Route to update the theme of a form
router.put("/:formId/theme", FormController.updateFormTheme);

module.exports = router;
