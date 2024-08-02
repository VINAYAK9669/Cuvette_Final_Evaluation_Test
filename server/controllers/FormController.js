const Form = require("../model/Form");
const Folder = require("../model/Folder");

// Controller to handle all Form related operations
const FormController = {
  //TODO: Function to create a new form
  createForm: async (req, res) => {
    try {
      const { userId, folderId, formName, sharedLink, formDetails } = req.body;

      // Check if folderId is provided
      if (folderId) {
        // Check if the folder exists in the database
        const folder = await Folder.findById(folderId);
        if (!folder) {
          // If folder not found, return error response
          return res.status(404).json({ error: "Folder not found" });
        }
      }

      // Creating a new form instance
      const newForm = new Form({
        userId,
        folderId: folderId || null,
        formName: formName || "Untitled Form",
        sharedLink,
        formDetails,
      });

      // Saving the new form to the database
      const savedForm = await newForm.save();

      // Sending the saved form as response
      res.status(201).json(savedForm);
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Function to get all forms for a specific user
  getFormsByUser: async (req, res) => {
    try {
      const { userId } = req.params;

      // Finding all forms created by the specific user
      const forms = await Form.find({ userId });

      // Sending the forms as response
      res.status(200).json(forms);
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Function to get all forms in a specific folder
  getFormsByFolder: async (req, res) => {
    try {
      const { folderId, userId } = req.params;
      console.log(folderId, userId);

      const query = folderId
        ? { folderId, userId }
        : { folderId: null, userId };

      // Finding all forms for the specific query
      const forms = await Form.find(query);

      console.log(`Found ${forms.length} forms`); // Log the number of forms found

      // Sending the forms as response
      res.status(200).json(forms);
    } catch (error) {
      console.error("Error fetching forms:", error); // Log the error
      // Sending error response if something goes wrong
      res.status(500).json({ error: "Something went wrong" });
    }
  },

  //TODO: Function to get a specific form by its ID
  getFormById: async (req, res) => {
    try {
      const { formId } = req.params;

      // Finding the form by its ID
      const form = await Form.findById(formId);

      if (!form) {
        // Sending a 404 response if the form is not found
        return res.status(404).json({ error: "Form not found" });
      }

      // Sending the found form as response
      res.status(200).json(form);
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Function to update a form by its ID
  updateForm: async (req, res) => {
    try {
      const { formId } = req.params;
      const { formName, sharedLink, formDetails } = req.body;

      // Finding the form by its ID and updating its details
      const updatedForm = await Form.findByIdAndUpdate(
        formId,
        { formName, sharedLink, formDetails },
        { new: true }
      );

      if (!updatedForm) {
        // Sending a 404 response if the form is not found
        return res.status(404).json({ error: "Form not found" });
      }

      // Sending the updated form as response
      res.status(200).json(updatedForm);
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Function to delete a form by its ID
  deleteForm: async (req, res) => {
    try {
      const { formId } = req.params;

      // Finding the form by its ID and deleting it
      const deletedForm = await Form.findByIdAndDelete(formId);

      if (!deletedForm) {
        // Sending a 404 response if the form is not found
        return res.status(404).json({ error: "Form not found" });
      }

      // Sending a success message as response
      res.status(200).json({ message: "Form deleted successfully" });
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Method to update form details of a specific form
  updateFormDetails: async (req, res) => {
    try {
      const { formId } = req.params;
      const { formDetails } = req.body;

      // Find the form by its ID
      const form = await Form.findById(formId);

      // If the form doesn't exist, return a 404 error
      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }

      // Update the formDetails array
      form.formDetails = formDetails;

      // Save the updated form
      const updatedForm = await form.save();

      // Send the updated form as response
      res.status(200).json(updatedForm);
    } catch (error) {
      // Handle errors and send error response
      res.status(500).json({ error: error.message });
    }
  },

  // TODO: Method to get all the forms without the folderId
  getFormsWithoutFolder: async (req, res) => {
    try {
      const { userId } = req.params;

      // Finding all forms where folderId is null and userId matches
      const forms = await Form.find({ folderId: null, userId });

      // Sending the forms as response
      res.status(200).json(forms);
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },
  // TODO:Function to update the theme of a form by its ID
  updateFormTheme: async (req, res) => {
    try {
      const { formId } = req.params;
      const { theme } = req.body;

      // Finding the form by its ID and updating the theme
      const updatedForm = await Form.findByIdAndUpdate(
        formId,
        { theme },
        { new: true }
      );

      if (!updatedForm) {
        // Sending a 404 response if the form is not found
        return res.status(404).json({ error: "Form not found" });
      }

      // Sending the updated form as response
      res.status(200).json(updatedForm);
    } catch (error) {
      // Sending error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = FormController;
