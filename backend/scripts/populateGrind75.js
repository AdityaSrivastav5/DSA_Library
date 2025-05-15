require('dotenv').config(); // Add this at the top to load .env file
const mongoose = require('mongoose');
const Grind75Question = require('./../models/grind75Model');
const grind75Data = require('./../data/grind75Data.json');

const populateDatabase = async () => {
  try {
    // First verify the connection string
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL not found in environment variables');
    }
    
    console.log('Connecting with:', process.env.MONGO_URL); // Debug log
    
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Database connected! Clearing old data...');
    await Grind75Question.deleteMany({});
    
    console.log('Inserting new data...');
    await Grind75Question.insertMany(grind75Data);
    
    console.log('Database populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error.message);
    process.exit(1);
  }
};

populateDatabase();