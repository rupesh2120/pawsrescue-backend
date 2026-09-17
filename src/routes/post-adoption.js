const express = require("express");

const postAdoptionRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const Animal = require("../models/animals");

postAdoptionRouter.post("/animal/post-adoption", userAuth, async (req, res) => {
  try {
    const postedBy = req.user._id;

    // ---- 1. Whitelist what the user is allowed to send ----
    const {
      name,
      species,
      location,
      photos,
      breed,
      age,
      gender,
      about,
      attributes,
      health,
      rescuedDate,
      adoptionFee,
    } = req.body;

    const requiredFields = { name, species, location, photos };

    const missingFields = Object.keys(requiredFields).filter(
      (key) =>
        !requiredFields[key] ||
        (Array.isArray(requiredFields[key]) &&
          requiredFields[key].length === 0),
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required field(s): ${missingFields.join(", ")}`,
      });
    }

    // ---- 3. Build the document — status is always 'draft' at creation, never user-supplied ----
    const animal = new Animal({
      name,
      species,
      location,
      photos,
      breed,
      age,
      gender,
      about,
      attributes,
      health,
      rescuedDate,
      adoptionFee,
      postedBy,
      status: "draft",
    });

    const data = await animal.save();

    res.status(201).json({
      message:
        "Animal posted successfully! Add more details anytime before publishing.",
      data,
    });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error posting animal for adoption",
        error: error.message,
      });
  }
});

module.exports = postAdoptionRouter;
