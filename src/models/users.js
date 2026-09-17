const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const usersSchema = new mongoose.Schema(
  {
    //Required field during signup

    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email format");
      },
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    // ---- Optional, fill later from profile page ----
    phone: { type: String },
    avatar: { type: String }, // image URL
    orgName: { type: String, trim: true }, // "Happy Paws Rescue" — only if they're a shelter, not an individual

    role: {
      type: String,
      enum: ["individual", "shelter"],
      default: "individual",
    },

    address: {
      city: { type: String },
      state: { type: String },
    },

    bio: { type: String, maxlength: 500 },

    // ---- Privacy control — the important one for your "Contact Shelter" flow ----
    contactPreference: {
      type: String,
      enum: ["in_app_only", "email", "phone"],
      default: "in_app_only",
    },

    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

usersSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
   });
   
  return token;
}

usersSchema.methods.validatePassword = async function(passwordInputByUser){

  const user = this

  const passwordHash = user.password

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)

  return isPasswordValid
}

module.exports = mongoose.model("User", usersSchema);
