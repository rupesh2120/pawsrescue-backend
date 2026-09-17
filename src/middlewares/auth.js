//10.3 Auth middleware: We will create a middleware to validate the token for all the api calls during authentication. We will use this middleware in the routes that require authentication. We will create a new file called auth.js in the middlewares folder and write the logic to validate the token in this file. We will use jwt.verify() method to verify the token and if the token is valid, we will call next() method to pass the control to the next middleware or route handler. If the token is invalid, we will return a 401 Unauthorized response.
const jwt = require("jsonwebtoken")
const User = require("../models/users")

const userAuth = async (req, res, next) => {

  /**
   * try {
  const token = req.cookies.token; // here we are getting the token from the cookie. We will use this token to verify the user during authentication.

  const decoded = await jwt.verify(token, "Secret_key_known_only_to_server"); // here we are verifying the token using the secret key. If the token is valid, it will return the decoded payload. If the token is invalid, it will throw an error.

  const userId = decoded._id; // here we are getting the user id from the decoded payload. We will use this user id to get the user details from the database

  //get the user details from the database using userId

  const user = await User.findById(userId);

  if(!user){
    return res.status(401).json({message: "User not found"});
  }
  req.user = user; // here we are attaching the user object to the req object so that we can access the user details in the next middleware or route handler.
  next();
  } catch (error) {
    return res.status(401).json({message: "Invalid token"});
  }
   */

  try{
    const {token} = req.cookies;

    if(!token){
      return res.status(401).send("Please Login!!");
    }

    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET) 

    const { _id } = decodedMessage

    const user = await User.findById({_id})
    
    if(!user){
      throw new Error("User does not exist")
    }

    req.user = user
    next() //it is called to move to next request handler
  }catch(err){
    res.status(400).send("Something went wrong: " + err.message)
  }
}

module.exports = {
  userAuth
}