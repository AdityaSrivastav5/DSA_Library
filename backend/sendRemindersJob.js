// sendRemindersJob.js
require("dotenv").config();
const nodemailer = require('nodemailer');
const { sendReminders } = require('./controller/reminderController.js'); // Update the path if needed
const { db } = require('./db/db.js');

// Initialize database connection
db();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Run the sendReminders function
sendReminders(transporter)
    .then(() => {
        console.log('Reminders sent successfully.');
        process.exit(0); // Exit after successful execution
    })
    .catch((error) => {
        console.error('Error sending reminders:', error);
        process.exit(1); // Exit with error code
    });
