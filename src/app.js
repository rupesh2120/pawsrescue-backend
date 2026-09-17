require("dotenv").config({
  path: `.env.${process.env.APP_ENV || "development"}`
});

const express = require('express');

const cookieParser = require("cookie-parser")

const connectDB = require('./config/database');
const app = express();
app.use(cookieParser());

const {} = require('./middlewares/auth'); //10.4

// const authRouter = require('./routes/auth'); //S2. 11 We will use express-router to create a separate route for animals, feeds, authentications. Refer devTinder backend project for reference. We will create a new folder called routes and create a new file called animals.js in the routes folder. We will write the logic to handle the animals related api calls in this file. We will use express.Router() method to create a new router and then we will use this router in the app.js file.

app.use(express.json()); //S2. 7 Diving into APIS: When any post request made and it has body, the value in req.body will be undefined as the req.body is in json format. To fix this, we need to use express.json() middleware to parse the incoming request body as JSON.

//S2. 7 Diving into APIS: When any post request made and it has body, the value in req.body will be undefined as the req.body is in json format. To fix this, we need to use express.json() middleware to parse the incoming request body as JSON.
app.use(express.json());

//S2. 11.04 importing all the routers

const authRouter = require('./routes/auth'); //S2. 11 We will use express-router to create a separate route for animals, feeds, authentications. Refer devTinder backend project for reference. We will create a new folder called routes and create a new file called animals.js in the routes folder. We will write the logic to handle the animals related api calls in this file. We will use express.Router() method to create a new router and then we will use this router in the app.js file.
const postAdoptionRouter = require("./routes/post-adoption");

app.use("/", authRouter); //S2. 11.05 using the auth router for all the auth related api calls
app.use("/", postAdoptionRouter);

// app.post("/signup", (req, res) => {
//   //S2. 9 Encrypting Passwords
//   //Validation of data
//   validateSignupData(req);

//   const {password} = req.body;

//   //Encrypt the password, for this we are going to create validation.js file in utils folder and write the validation logic there. We will use bcryptjs library to encrypt the password before saving it to the database. We will use bcryptjs.hash() method to hash the password and then save it to the database. We will also use bcryptjs.compare() method to compare the hashed password with the plain text password during login.

//   const passwordHash = bcrypt.hashSync(password, 10); //S2. 9 Encrypting Passwords: We will use bcryptjs library to encrypt the password before saving it to the database. We will use bcryptjs.hash() method to hash the password and then save it to the database. We will also use bcryptjs.compare() method to compare the hashed password with the plain text password during login.

//   //create a new user in the database
// });


//S2. 10 Authentication
// app.post("/login", (req, res) => {
//   const {emailId, password} = req.body;

//   const isPasswordValid = bcrypt.compareSync(password, user.password); //S2. 9 Encrypting Passwords: We will use bcryptjs library to encrypt the password before saving it to the database. We will use bcryptjs.hash() method to hash the password and then save it to the database. We will also use bcryptjs.compare() method to compare the hashed password with the plain text password during login. 

//   if(!isPasswordValid){
//     return res.status(401).json({message: "Invalid email or password"});
//   }

//   if(isPasswordValid){
//     //S2. 10: Create a JWT token

//     //Add the token in cookie and send it to the client. We will use jsonwebtoken library to create a JWT token. We will use jwt.sign() method to create a JWT token and then send it to the client. We will also use jwt.verify() method to verify the JWT token during authentication.
//     //10.1 first we install jsonwebtoken

//     const token = await jwt.sign({ _id: user._id}, "Secret_key_known_only_to_server") // here we are hiding user id in the token and we are using a secret key to sign the token. This secret key should be known only to the server and should not be shared with anyone. We will use this secret key to verify the token during authentication.
//     res.cookie("token", token, { httpOnly: true });
//   }
//   //create a new user in the database
// });

// app.get("/profile", userAuth, (req, res) => {
//   //S2. 10: Authentication: 10.2 Validate the token

//   // const token = req.cookies.token; // here we are getting the token from the cookie. We will use this token to verify the user during authentication.

//   // const decoded = jwt.verify(token, "Secret_key_known_only_to_server"); // here we are verifying the token using the secret key. If the token is valid, it will return the decoded payload. If the token is invalid, it will throw an error.

//   // const userId = decoded._id; // here we are getting the user id from the decoded payload. We will use this user id to get the user details from the database.

//   // //get the user details from the database using userId

//   // const user = await User.findById(userId);

//   const user = req.user; // here we are getting the user object from the req object. We will use this user object to get the user details from the database.



// });

const PORT = process.env.PORT || 7000;

//S2. 11 We will use express-router to create a separate route for animals, feeds, authentications. Refer devTinder backend project for reference. We will create a new folder called routes and create a new file called animals.js in the routes folder. We will write the logic to handle the animals related api calls in this file. We will use express.Router() method to create a new router and then we will use this router in the app.js file.

connectDB().then(() => {
  console.log('Database connected successfully');
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} and environment is ${process.env.APP_ENV || "default development"}`);
})
}).catch((error) => {
  console.error('Database connection failed:', error);
})