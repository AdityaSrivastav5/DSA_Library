const User = require('../models/userModel');
const { users } = require('@clerk/clerk-sdk-node'); // Clerk SDK for server-side use

exports.addClerkUserToDB = async (req, res) => {
  try {
    // Fetch user ID from Clerk
    const { clerkUserId } = req.body; // Make sure to pass the Clerk User ID in the request body

    // Fetch user details from Clerk
    const clerkUser = await users.getUser(clerkUserId);

    // Prepare data for MongoDB
    const userData = {
      email: clerkUser.emailAddresses[0]?.emailAddress,
      username: clerkUser.username || '',
      // Add more fields from Clerk as needed
      selectedTopic: '',
      lastQuestionIndex: -1,
    };

    // Save or update user in MongoDB
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      // If user already exists, update their details
      existingUser.username = userData.username;
      await existingUser.save();
    } else {
      // If user doesn't exist, create a new user
      const newUser = new User(userData);
      await newUser.save();
    }

    res.status(200).send('User data saved to MongoDB');
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).send('Error saving user data');
  }
};
