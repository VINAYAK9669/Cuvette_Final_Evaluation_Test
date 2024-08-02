// TODO: 1]  Import Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors"); // Import CORS module
const errorHandler = require("./middlewares/errorHandler");

// TODO: 5] Import Custom Module [Routes]
const userRoute = require("./routes/userRoute");
const folderRoutes = require("./routes/FolderRoute");
const formRoutes = require("./routes/formRoute");
const userReponse = require("./routes/userResponse");

// TODO: 2] Create a instance of express and declare port
const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true }));

// TODO: 3] Listen to the server
app.listen(PORT, () => {
  console.log(`Server is running on the port : ${PORT}`);
});

// TODO: 4]  Connect to the MangoDB
// * i) Create a cluster
// * ii) Database >>  Browse collection >> Delete the prev data >>  create own data
// * iii) Go to Network Access >> Change the IP to current IP address

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connnected to mahgoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MagoDb");
  });

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/health", (req, res) => {
  res.json({
    message: "Working Fine",
  });
});
// TODO: 6] Use the defined routes
app.use("/user", userRoute);
app.use("/api", folderRoutes);
app.use("/formapi", formRoutes);
app.use("/response", userReponse);

app.use(errorHandler);
