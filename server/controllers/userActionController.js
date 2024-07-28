const UserAction = require("../model/UserAction");

const addNewSharedLink = async (req, res) => {
  const { userId, sharedLink, totalInputs } = req.body;

  try {
    // Check if the shared link already exists
    const existingLink = await UserAction.findOne({
      "LinkDetails.sharedLink": sharedLink,
    });
    if (existingLink) {
      return res.status(400).json({ message: "Shared link already exists" });
    }

    // Find the user by userId and add the new shared link
    let userAction = await UserAction.findOne({ userId });
    if (!userAction) {
      userAction = new UserAction({ userId, LinkDetails: [] });
    }

    userAction.LinkDetails.push({
      sharedLink,
      totalInputs,
      formFillerData: [],
    });
    await userAction.save();

    res
      .status(201)
      .json({ message: "Shared link added successfully", userAction });
  } catch (error) {
    res.status(500).json({ message: "Error adding shared link", error });
  }
};

const addUserToFormFillerData = async (req, res) => {
  const { sharedLink, name, email } = req.body;

  try {
    // Find the shared link in the database
    const userAction = await UserAction.findOne({
      "LinkDetails.sharedLink": sharedLink,
    });
    if (!userAction) {
      return res.status(404).json({ message: "Shared link not found" });
    }

    // Check if the email already exists in the formFillerData
    const linkDetails = userAction.LinkDetails.find(
      (link) => link.sharedLink === sharedLink
    );
    const existingUser = linkDetails.formFillerData.find(
      (user) => user.email === email
    );
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Add the new user to formFillerData
    linkDetails.formFillerData.push({ name, email, formDetails: [] });
    await userAction.save();

    res.status(201).json({ message: "User added successfully", userAction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user to form filler data", error });
  }
};

const addUserInputToFormDetails = async (req, res) => {
  const { sharedLink, email, formInput } = req.body;

  try {
    // Find the shared link in the database
    const userAction = await UserAction.findOne({
      "LinkDetails.sharedLink": sharedLink,
    });
    if (!userAction) {
      return res.status(404).json({ message: "Shared link not found" });
    }

    // Find the user by email in formFillerData
    const linkDetails = userAction.LinkDetails.find(
      (link) => link.sharedLink === sharedLink
    );
    const user = linkDetails.formFillerData.find(
      (user) => user.email === email
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the form details to the user's formDetails
    user.formDetails.push(formInput);
    await userAction.save();

    res.status(201).json({
      message: "Form details added successfully",
      formDetails: user.formDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding form details", error });
  }
};

const getUserActionsBySharedLink = async (req, res) => {
  const { userId, sharedLink } = req.body;

  try {
    // Find the user action by userId and sharedLink
    const userAction = await UserAction.findOne({
      userId,
      "LinkDetails.sharedLink": sharedLink,
    });

    if (!userAction) {
      return res
        .status(404)
        .json({ message: "User action or shared link not found" });
    }

    // Extract the specific shared link details
    const linkDetails = userAction.LinkDetails.find(
      (link) => link.sharedLink === sharedLink
    );

    res
      .status(200)
      .json({ userId: userAction.userId, sharedLinkDetails: linkDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user action details", error });
  }
};

module.exports = {
  addNewSharedLink,
  addUserToFormFillerData,
  addUserInputToFormDetails,
  getUserActionsBySharedLink,
};
