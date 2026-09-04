const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect('mongodb+srv://namastedev:CAtb9W7p8apcjNBV@namastenode.vbecc.mongodb.net/pawsrescue')
}

module.exports = connectDB;

// connectDB().then(() => {
//   console.log('Database connected successfully');
// }).catch((error) => {
//   console.error('Database connection failed:', error);
// });
//We should only start the server after the database connection is successful. So, we will move the app.listen() inside the connectDB() promise resolution in src/app.js.


//Next write schema under models folder and then write animals file