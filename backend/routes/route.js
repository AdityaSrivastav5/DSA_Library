const express = require("express");
const { signup } = require('../controller/user.js');
const { sendReminders } = require('../controller/reminderController.js');
const { addClerkUserToDB } = require('../controller/clerkController.js');
const router = express.Router();
const Feedback = require('../models/feedbackModel.js');
const setReminder = require('../controller/setReminder.js');

router.post("/signup", signup);
router.post("/add-user", addClerkUserToDB);
router.post("/set-reminder", setReminder);

router.post('/feedback', async (req, res) => {
    const { name, email, feedback } = req.body;

    try {
        const newFeedback = new Feedback({ name, email, feedback });
        await newFeedback.save();
        res.status(200).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'Error saving feedback' });
    }
});

router.post("/send", async (req, res) => {
    try {
        const transporter = req.transporter; // Access transporter from req
        await sendReminders(transporter);
        res.status(200).send('Reminders sent successfully');
    } catch (error) {
        res.status(500).send('Error sending reminders: ' + error.message);
    }
});

module.exports = router;