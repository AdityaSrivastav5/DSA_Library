const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    selectedTopic: {
        type: String,
        default: '',
    },
    lastQuestionIndex: {
        type: Number,
        default: -1, // Track the last question sent
    },
});

module.exports = mongoose.model('User', userSchema);
