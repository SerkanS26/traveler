const router = require("express").Router();
const Pin = require("../models/Pin");

//create a pin

router.post("/", async (req, res, next) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(201).json(savedPin);
  } catch (error) {
    res.status(500).json(err);
  }
});

// get all pins

router.get("/", async (req, res, next) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
