const fs = require('fs');
const path = require('path');
const User = require('../models/userModel.js');

// Load DSA questions from JSON file
let dsaQuestions;
try {
    const dsaQuestionsPath = path.join(__dirname, '../data/DsaQuestion.json');
    const fileContent = fs.readFileSync(dsaQuestionsPath, 'utf-8');
    dsaQuestions = JSON.parse(fileContent);
    console.log('DSA questions loaded successfully:', dsaQuestions);
} catch (error) {
    console.error('Error reading or parsing DSAQuestions.json:', error);
    throw error; // Exit if the JSON is invalid or unreadable
}

// Send reminders function
exports.sendReminders = async (transporter) => {
    try {
        console.log('Sending reminders started...');
        const users = await User.find();
        console.log('Users fetched from the database:', users);

        for (const user of users) {
            console.log(`Processing reminders for user: ${user.email}`);
            const selectedDsaQuestion = dsaQuestions.find(dsa => dsa.topicName === user.selectedTopic);

            if (!selectedDsaQuestion) {
                console.log(`No questions found for topic "${user.selectedTopic}" for user ${user.email}`);
                continue;
            }

            const nextQuestionIndex = user.lastQuestionIndex + 1;
            console.log(`Next question index for user ${user.email}: ${nextQuestionIndex}`);

            if (nextQuestionIndex >= selectedDsaQuestion.questions.length) {
                console.log(`All questions sent for topic "${user.selectedTopic}" for user ${user.email}`);
                continue;
            }

            const selectedQuestion = selectedDsaQuestion.questions[nextQuestionIndex];
            console.log(`Selected question for user ${user.email}:`, selectedQuestion);

            const formattedMessage = `Subject: Today's question on ${user.selectedTopic} 

Hi Achiever,

Here's today’s challenge in ${user.selectedTopic} to keep you progressing:

Problem of the Day: ${selectedQuestion.Problem}
👉 ${selectedQuestion.URL}
👉 ${selectedQuestion.URL2}

Stay consistent, and remember, each problem brings you one step closer to mastering ${user.selectedTopic}!

Best of luck,
Team AMR`;
            console.log(`Formatted message for ${user.email}: ${formattedMessage}`);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: `DSA Reminder: ${user.selectedTopic}`,
                text: formattedMessage,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`Email sent successfully to ${user.email}`);
            } catch (mailError) {
                console.error(`Failed to send email to ${user.email}:`, mailError);
                continue; // If email fails, continue with the next user
            }

            user.lastQuestionIndex = nextQuestionIndex;
            await user.save();
            console.log(`Updated lastQuestionIndex for ${user.email} to ${nextQuestionIndex}`);
        }
        console.log('Reminders sending process completed.');
    } catch (error) {
        console.error('Error sending reminders:', error);
        throw error;
    }
};