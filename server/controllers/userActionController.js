const UserAction = require("../models/UserAction");

module.exports = {
  //TODO: Method to create a new user action
  createUserAction: async (req, res) => {
    try {
      const { userId, sharedLinks, completionRate, userResponse } = req.body;

      //* Create a new user action instance
      const newUserAction = new UserAction({
        userId,
        sharedLinks,
        completionRate,
        userResponse,
      });

      //* Save the new user action to the database
      const savedUserAction = await newUserAction.save();

      //* Send the saved user action as response
      res.status(201).json(savedUserAction);
    } catch (error) {
      //* Handle errors and send error response
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Method to update user responses for a specific user action
  updateUserResponse: async (req, res) => {
    try {
      const { userActionId } = req.params;
      const { userResponse } = req.body;

      // Find the user action by its ID
      const userAction = await UserAction.findById(userActionId);

      // If the user action doesn't exist, return a 404 error
      if (!userAction) {
        return res.status(404).json({ error: "User action not found" });
      }

      // Update the userResponse array
      userAction.userResponse = userResponse;

      // Save the updated user action
      const updatedUserAction = await userAction.save();

      // Send the updated user action as response
      res.status(200).json(updatedUserAction);
    } catch (error) {
      // Handle errors and send error response
      res.status(500).json({ error: error.message });
    }
  },

  //TODO: Method to get user actions by sharedLink
  getUserActionsBySharedLink: async (req, res) => {
    try {
      const { sharedLinks } = req.params;

      // Find user actions by sharedLinks
      const userActions = await UserAction.find({ sharedLinks });

      // If no user actions found, return a 404 error
      if (userActions.length === 0) {
        return res.status(404).json({
          error: "No user actions found for the provided sharedLinks",
        });
      }

      // Send the found user actions as response
      res.status(200).json(userActions);
    } catch (error) {
      // Handle errors and send error response
      res.status(500).json({ error: error.message });
    }
  },
};

//TODO: Function to calculate completion rate
function calculateCompletionRate(userResponse) {
  const total = userResponse.length;
  const completed = userResponse.filter((response) =>
    response.formDetails.every((detail) => detail.completionStatus)
  ).length;
  return (completed / total) * 100;
}
