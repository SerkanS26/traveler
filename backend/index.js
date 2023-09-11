const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();
app.use(express.json());

const MongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected !");
  } catch (error) {
    console.log(`Error connecting to MongoDB Atlas : ${error}`);
  }
};

// Connecting to the database and starting server on port 8800 or process env variable PORT if set else default is 8800
MongoDBConnect();

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT | 8800, () => {
  console.log("Server is running on port 8800 !");
});
