const express = require('express');
const connectDB = require('./config/database');
const app = express();

connectDB().then(() => {
  console.log('Database connected successfully');
  app.listen(7000, () => {
  console.log('Server is running on port 7000');
})
}).catch((error) => {
  console.error('Database connection failed:', error);
})