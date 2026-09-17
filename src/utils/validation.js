//S2. 9: Encrypting Passwords: We will use bcryptjs library to encrypt the password before saving it to the database. We will use bcryptjs.hash() method to hash the password and then save it to the database. We will also use bcryptjs.compare() method to compare the hashed password with the plain text password during login.

const validator = require('validator');

const validateSignupData = (req) => {
  const { name, email, password } = req.body

  if(!name){
    throw new Error("Name is not valid")
  }
  else if(name.length < 4 || name.length > 50){
    throw new Error("Name length should between 4 and 50")
  }
  else if(!validator.isEmail(email)){
    throw new Error("Email is not valid")
  }
}

module.exports = { validateSignupData }