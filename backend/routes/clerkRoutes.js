const express = require('express');
const { addClerkUserToDB } = require('../controllers/clerkController');
const router = express.Router();

// Route to add Clerk user to MongoDB
router.post('/add-user', addClerkUserToDB);

module.exports = router;
