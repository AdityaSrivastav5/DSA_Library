const User = require("../models/userModel.js");

const setReminder = async (req, res) => {
    const { email, topic } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new object to avoid reassignment of a constant
        user.selectedTopic = topic; // Modify the existing user object
        await user.save();

        return res.status(200).json({ message: 'Reminder set successfully', selectedTopic: user.selectedTopic });
    } catch (error) {
        console.error('Error setting reminder:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = setReminder;
