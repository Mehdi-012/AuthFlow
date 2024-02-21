const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookiparser = require('cookie-parser')

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.URL, {
    dbName: process.env.DBNAME
}).then(() => {
    console.log('App is connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

// Create a router for user routes
const userRoutes = require('./routes/userRoute');
const courseRoutes = require('./routes/courseRoute');

// Middleware to parse incoming requests
app.use(express.json());
app.use(cookiparser());

// Use the user routes
app.use('/user', userRoutes);
app.use('/course', courseRoutes);
// app.use('/course', courseRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
