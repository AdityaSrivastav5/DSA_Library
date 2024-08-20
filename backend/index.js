require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5003;
const appRoute = require('./routes/route.js')
const app = express();

 app.use(express.json());

app.use('/api',appRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})