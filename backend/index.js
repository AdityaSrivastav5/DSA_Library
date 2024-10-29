require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const nodemailer = require('nodemailer');
const { db } = require('./db/db.js');
const userRoutes = require('./routes/route.js');

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
const cors = require('cors');
app.use(cors()); // Allow all origins (for testing; adjust for production)

app.use(bodyParser.json());

// Database connection
db();

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Routes
app.use("/user", userRoutes);

// Cron job to send reminders daily at 10:32 AM
// Cron job to send reminders daily at 10:32 AM
cron.schedule('25 14 * * *', async () => {
    try {
        const { sendReminders } = require('./controller/reminderController.js'); // Correct path
        await sendReminders(transporter);
    } catch (error) {
        console.error('Error sending reminders:', error);
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});