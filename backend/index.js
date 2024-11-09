require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const { db } = require('./db/db.js');
const userRoutes = require('./routes/route.js'); // Import routes

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
const cors = require('cors');
app.use(cors());

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

// Pass transporter to routes
app.use("/user", (req, res, next) => {
    req.transporter = transporter; // Attach transporter to the request
    next();
}, userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});