const express = require("express");
const { signup } = require('../controller/user.js');
const { sendReminders } = require('../controller/reminderController.js');
// const { addClerkUserToDB } = require('../controllers/clerkController');
const { addClerkUserToDB } = require('../controller/clerkController.js')
const router = express.Router();


router.post("/signup", signup);

router.post("/add-user", addClerkUserToDB);
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