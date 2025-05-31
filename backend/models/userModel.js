// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     selectedTopic: {
//         type: String,
//         default: '',
//     },
//     lastQuestionIndex: {
//         type: Number,
//         default: -1, // Track the last question sent
//     },
// });

// module.exports = mongoose.model('User', userSchema);


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
        default: -1,
    },
    completedQuestions: {
        type: Map,
        of: [String], // Store question IDs for each topic
        default: {}
    },
    stats: {
        totalCompleted: {
            type: Number,
            default: 0
        },
        byDifficulty: {
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 }
        },
        byTopic: {
            type: Map,
            of: Number,
            default: {}
        }
    }
});

module.exports = mongoose.model('User', userSchema);
