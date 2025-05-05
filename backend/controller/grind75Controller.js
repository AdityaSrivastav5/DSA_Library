const Grind75Question = require('../models/grind75Model.js');

// Make sure this is a function
const getAllGrind75Questions = async (req, res) => {
  try {
    const questions = await Grind75Question.find({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export as an object with the function
module.exports = {
  getAllGrind75Questions
};