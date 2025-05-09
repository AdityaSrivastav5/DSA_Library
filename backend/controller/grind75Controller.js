const Grind75Question = require('../models/grind75Model.js');

// Make sure this is a function
const getAllGrind75Questions = async (req, res) => {
  console.log("hello from grind75")
  try {
    const questions = await Grind75Question.find({});
    console.log(questions)
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export as an object with the function
module.exports = {
  getAllGrind75Questions
};