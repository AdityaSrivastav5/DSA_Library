const mongoose = require('mongoose');

const grind75QuestionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  level: { type: String, required: true },
  topics: [{ type: [String], required: true }]
});

module.exports = mongoose.model('Grind75Question', grind75QuestionSchema);