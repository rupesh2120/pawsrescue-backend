const mongoose = require('mongoose');

const connectDB = async () => {

  const {MONGODB_URI} = process.env;

  if(!MONGODB_URI){
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }

  return mongoose.connect(MONGODB_URI);
}

module.exports = connectDB;

// connectDB().then(() => {
//   console.log('Database connected successfully');
// }).catch((error) => {
//   console.error('Database connection failed:', error);
// });
//S2. 6 Database, Schema: We should only start the server after the database connection is successful. So, we will move the app.listen() inside the connectDB() promise resolution in src/app.js.


//Next write schema under models folder and then write animals file