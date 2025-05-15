const User = require('../models/userModel.js'); // Make sure this path is correct

const addClerkUserToDB = async (req, res) => {
  const { clerkUserId, email, username } = req.body;

  try {
      // Check if the user already exists in the database
      let existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).send('User already exists');
      }

      // If username is not provided, set it to a default value or handle accordingly
      const newUser = new User({
          email,
          username: username.trim() || 'Guest', // Set a default username if empty
          selectedTopic: '',
          lastQuestionIndex: -1,
      });

      await newUser.save();
      res.status(201).send('User added successfully');
  } catch (error) {
      console.error('Error adding user to DB:', error);
      res.status(500).send('Error adding user to DB');
  }
};


// Export the function
module.exports = { addClerkUserToDB };
