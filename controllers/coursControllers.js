const Course = require('../models/courseModel'); // Correct the import path to point to the correct model

exports.createCourse = async (req, res) => {
    // Extract data from request body
    const { course } = req.body;

    try {
        // Create course using Course model
        const addCourse = await Course.create({
            course
        });

        // Send success response
        return res.status(201).json({
            success: true,
            message: 'Course has been successfully added',
            data: addCourse
        });
    } catch (error) {
        // Send error response if course cannot be added
        return res.status(400).json({
            status: false,
            message: 'Course cannot be added',
            error: error.message
        });
    }
};
