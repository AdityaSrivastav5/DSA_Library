const User = require("../models/userModel.js");

exports.signup = async (req, res) => {
    const { email, password, username, selectedTopic } = req.body;

    const newUser = new User({
        email,
        password,
        username,
        selectedTopic,
    });

    try {
        await newUser.save();
        res.status(201).send("User added successfully!");
    } catch (error) {
        res.status(500).send("Error adding user: " + error.message);
    }
};