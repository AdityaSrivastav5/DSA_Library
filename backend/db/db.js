const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false); // Keeps strictQuery setting, if needed
        await mongoose.connect(process.env.MONGO_URL); // No need for deprecated options
        console.log('Database connected successfully');
    } catch (error) {
        console.log('DB Connection Failed:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = { db };
