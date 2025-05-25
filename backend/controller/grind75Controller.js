// const Grind75Question = require("../models/grind75Model")

// // Make sure this is a function
// const getAllGrind75Questions = async (req, res) => {
//   console.log("hello from grind75")
//   try {
//     const questions = await Grind75Question.find({});
//     console.log(questions)
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Export as an object with the function
// module.exports = {
//   getAllGrind75Questions
// };


// controllers/grind75Controller.js
const Grind75Question = require("../models/grind75Model");

const getAllGrind75Questions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const questions = await Grind75Question.find({})
      .skip(skip)
      .limit(limit);
    
    const total = await Grind75Question.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      questions,
      currentPage: page,
      totalPages,
      totalQuestions: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGrind75Questions
};