

exports.remainder = async (req,res) => {
    try {
        const users = await User.find();
        const dsaQuestions = await DSAQuestion.find();
    
        for (const user of users) {
          const selectedDsaQuestion = dsaQuestions.find(dsa => dsa.topic === user.selectedTopic);
    
          if (!selectedDsaQuestion) {
            console.log(`No questions found for topic "${user.selectedTopic}" for user ${user.email}`);
            continue; // Skip sending reminders for this user
          }
    
          // Calculate the next question index
          const nextQuestionIndex = user.lastQuestionIndex + 1;
    
          // Check if there are more questions to send
          if (nextQuestionIndex >= selectedDsaQuestion.questions.length) {
            console.log(`All questions sent for topic "${user.selectedTopic}" for user ${user.email}`);
            continue; // Stop sending reminders for this user
          }
    
          const selectedQuestion = selectedDsaQuestion.questions[nextQuestionIndex];
    
          // Formatting the message
          const formattedMessage = `Today's question on ${user.selectedTopic}:\n\n${selectedQuestion.heading}: ${selectedQuestion.link}`;
    
          // Email content
          const mailOptions = {
            from: 'adityasrivastav863@gmail.com',
            to: user.email,
            subject: `DSA Reminder: ${user.selectedTopic}`,
            text: formattedMessage // Use formatted text in the email
          };
    
          // Send email
          await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${user.email}`);
          user.lastQuestionIndex = nextQuestionIndex;
          await user.save();
        }
    }
    catch (error) {
        console.error('Error sending reminders:', error);
        res.status(500).send('Error sending reminders: ' + error.message);
      }
}