const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false, // Hide this field in the output
    },
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z]+$/,
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
