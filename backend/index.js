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
cron.schedule('32 11 * * *', async () => {
    try {
        const { sendReminders } = require('./controller/user.js');
        await sendReminders(transporter);
    } catch (error) {
        console.error('Error sending reminders:', error);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
