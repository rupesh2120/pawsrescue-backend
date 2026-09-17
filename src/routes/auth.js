const express = require("express");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

const { validateSignupData } = require("../utils/validation");

const User = require("../models/users");

authRouter.post("/signup", async (req, res) => {
  try {
    //S2. 9 Encrypting Passwords
    //Validation of data: signup.login and encrypt the password(we create a helper function to validate (in the utils folder))

    validateSignupData(req);

    const { name, email, password } = req.body;

    //Encrypt the password, for this we are going to create validation.js file in utils folder and write the validation logic there. We will use bcryptjs library to encrypt the password before saving it to the database. We will use bcryptjs.hash() method to hash the password and then save it to the database. We will also use bcryptjs.compare() method to compare the hashed password with the plain text password during login.

    const passwordHash = await bcrypt.hash(password, 10); //S2. 9 Encrypting Passwords: We will use bcryptjs library to encrypt the password before saving it to the database. We will use bcryptjs.hash() method to hash the password and then save it to the database. We will also use bcryptjs.compare() method to compare the hashed password with the plain text password during login.

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //create a new user in the database

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 36000000),
    });
    res.json({ message: "User added successfully", data: savedUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding user", error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password); //S2. 9 Encrypting Passwords: We will use bcryptjs library to encrypt the password before saving it to the database. We will use bcryptjs.hash() method to hash the password and then save it to the database. We will also use bcryptjs.compare() method to compare the hashed password with the plain text password during login.

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (isPasswordValid) {
      //S2. 10: Create a JWT token

      //Add the token in cookie and send it to the client. We will use jsonwebtoken library to create a JWT token. We will use jwt.sign() method to create a JWT token and then send it to the client. We will also use jwt.verify() method to verify the JWT token during authentication.
      //10.1 first we install jsonwebtoken

      const token = await user.getJWT(); // here we are hiding user id in the token and we are using a secret key to sign the token. This secret key should be known only to the server and should not be shared with anyone. We will use this secret key to verify the token during authentication.
      // res.cookie("token", token, { httpOnly: true });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    }
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
  //create a new user in the database
});

module.exports = authRouter;
