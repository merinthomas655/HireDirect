const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    mongoose.set('strictPopulate', false); // Add this line before your connection
    const conn = await mongoose.connect(process.env.MONGO_URI); 
    console.log(`MongoDB is connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
