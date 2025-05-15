require('dotenv').config();
const express = require("express");
const { signup } = require('../controller/user.js');
// const { sendReminders } = require('../controller/reminderController.js');
// const { addClerkUserToDB } = require('../controllers/clerkController');
const { addClerkUserToDB } = require('../controller/clerkController.js')
const router = express.Router();
const Feedback = require('../models/feedbackModel.js')
const setReminder = require('../controller/setReminder.js')

const {getAllGrind75Questions} = require('../controller/grind75Controller.js')

const axios = require('axios');

// Add this to your existing routes
router.post('/execute', async (req, res) => {
    const { source_code, language_id, stdin } = req.body;
    console.log("Loaded API Key:", process.env.JUDGE0_API_KEY);

    
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'false',
            wait: 'true',
            fields: '*'
        },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.JUDGE0_API_KEY, // Add to .env
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
            source_code,
            language_id,
            stdin
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error('Execution error:', error);
        res.status(500).json({ error: 'Code execution failed' });
    }
});

router.post("/signup", signup);

router.post("/add-user", addClerkUserToDB);

router.post("/set-reminder",setReminder);

router.get("/grind75-questions", getAllGrind75Questions);

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