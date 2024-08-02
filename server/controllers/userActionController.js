const UserAction = require("../model/UserAction");

const addNewSharedLink = async (req, res) => {
  const { userId, sharedLink, totalInputs, formDetails, theme } = req.body;

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
      formDetails,
      theme,
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
  const { sharedLink, RandomId } = req.body;

  try {
    // Find the shared link in the database
    const userAction = await UserAction.findOne({
      "LinkDetails.sharedLink": sharedLink,
    });

    if (!userAction) {
      return res.status(404).json({ message: "Shared link not found" });
    }

    // Find the linkDetails corresponding to the sharedLink
    const linkDetails = userAction.LinkDetails.find(
      (link) => link.sharedLink === sharedLink
    );

    if (!linkDetails) {
      return res.status(404).json({ message: "Link details not found" });
    }

    // Check if the RandomId already exists in the formFillerData
    const existingUser = linkDetails.formFillerData.find(
      (filler) => filler.RandomId === RandomId
    );

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this RandomId already exists" });
    }

    // Add the new user to formFillerData
    linkDetails.formFillerData.push({ RandomId, formDetails: [] });
    await userAction.save();

    res.status(201).json({ message: "User added successfully", userAction });
  } catch (error) {
    console.error("Error adding user to form filler data", error);
    res.status(500).json({
      message: "Error adding user to form filler data",
      error: error.message,
    });
  }
};

const addUserInputToFormDetails = async (req, res) => {
  const { sharedLink, randomId, formInput } = req.body;

  console.log(sharedLink, randomId, formInput);

  try {
    // Find the shared link in the database
    const userAction = await UserAction.findOne({
      "LinkDetails.sharedLink": sharedLink,
    });
    if (!userAction) {
      return res.status(404).json({ message: "Shared link not found" });
    }

    // Find the link details for the shared link
    const linkDetails = userAction.LinkDetails.find(
      (link) => link.sharedLink === sharedLink
    );

    // Find the user by randomId in formFillerData
    const user = linkDetails.formFillerData.find(
      (user) => user.RandomId === randomId
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's form details
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
  const { sharedLink } = req.query;

  try {
    // Find the user action by userId and sharedLink
    const userAction = await UserAction.findOne({
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
