const express = require("express");
const { signup } = require('../controller/user.js');
const { sendReminders } = require('../controller/reminderController.js');
// const { addClerkUserToDB } = require('../controllers/clerkController');
const { addClerkUserToDB } = require('../controller/clerkController.js')
const router = express.Router();
const Feedback = require('../models/feedbackModel.js')


router.post("/signup", signup);

router.post("/add-user", addClerkUserToDB);

router.post('/feedback', async (req, res) => {
    const { name, email, feedback } = req.body;

    try {
        const newFeedback = new Feedback({
            name,
            email,
            feedback,
        });

        await newFeedback.save(); // Save feedback to the database

        res.status(200).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'Error saving feedback' });
    }
});
router.post("/send", async (req, res) => {
    const transporter = require('../index.js').transporter;
    try {
        await sendReminders(transporter);
        res.status(200).send('Reminders sent successfully');
    } catch (error) {
        res.status(500).send('Error sending reminders: ' + error.message);
    }
});

module.exports = router;