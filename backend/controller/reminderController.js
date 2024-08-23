const fs = require('fs');
const path = require('path');
const User = require('../models/userModel.js');

// Load DSA questions from JSON file
const dsaQuestionsPath = path.join(__dirname, '../DSAQuestion.json');
const dsaQuestions = JSON.parse(fs.readFileSync(dsaQuestionsPath, 'utf-8'));

// Send reminders
exports.sendReminders = async (transporter) => {
    try {
        const users = await User.find();

        for (const user of users) {
            const selectedDsaQuestion = dsaQuestions.find(dsa => dsa.topicName === user.selectedTopic);

            if (!selectedDsaQuestion) {
                console.log(`No questions found for topic "${user.selectedTopic}" for user ${user.email}`);
                continue;
            }

            const nextQuestionIndex = user.lastQuestionIndex + 1;

            if (nextQuestionIndex >= selectedDsaQuestion.questions.length) {
                console.log(`All questions sent for topic "${user.selectedTopic}" for user ${user.email}`);
                continue;
            }

            const selectedQuestion = selectedDsaQuestion.questions[nextQuestionIndex];

            const formattedMessage = `Today's question on ${user.selectedTopic}:\n\n${selectedQuestion.Problem}: ${selectedQuestion.URL}`;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: `DSA Reminder: ${user.selectedTopic}`,
                text: formattedMessage
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${user.email}`);

            user.lastQuestionIndex = nextQuestionIndex;
            await user.save();
        }
    } catch (error) {
        console.error('Error sending reminders:', error);
        throw error;
    }
};
