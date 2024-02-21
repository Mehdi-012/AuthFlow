// Importing the necessary modules
const { model, Schema } = require('mongoose');

// Define the course schema
const courseSchema = new Schema({
    course: {
        type: String,
        required: true
    }
});

// Define and export the course model
const Course = model('Course', courseSchema);
module.exports = Course;
