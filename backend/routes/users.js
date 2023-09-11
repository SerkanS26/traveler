const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Resgiter
router.post("/register", async (req, res, next) => {
  try {
    // generate new passw
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and send response
    const user = await newUser.save();
    res.status(201).json({
      message: `User Created!`,
      newUser: `id: ${user._id}, user: ${user.username}`,
    });
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

//Login

router.post("/login", async (req, res, next) => {
  try {
    //Find User
    const user = await User.findOne({ username: req.body.username }); // user
    if (!user) {
      res.status(400).json("Wrong user name!");
    }
    //Validate Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json(`Wrong password!`);
    }
    // Send response
    res.status(200).json({
      message: "Successful Logged In",
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
