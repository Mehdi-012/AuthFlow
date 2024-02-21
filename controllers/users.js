const userModel = require('../models/userModel'); // Check this import statement
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.createUser = async (req, res) => {
    // Extract data from request body
    const { name, age, email, password, role } = req.body;

    try {
        // Create user using userModel
        const addUser = await userModel.create({
            name,
            age,
            email,
            password,
            role
        });

        // Send success response
        return res.status(201).json({
            success: true,
            message: 'User has been successfully added',
            data: addUser
        });
    } catch (error) {
        // Send error response if user cannot be added
        return res.status(400).json({
            status: false,
            message: 'User cannot be added',
            error: error.message
        });
    }
};


// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) {
        //   return res.status(401).json({ message: 'Invalid credentials' });
        // }

        // Generate JWT token
        const secret = process.env.JWT_SECRET
        const payload = {
            name: user.name,
            email: user.email,
            role: user.role,
        }
        const options = {
            expiresIn: process.env.JWT_EXPIRES_IN
        }

        const token = jwt.sign(payload, secret, options);
        console.log(token);


        // Send token in response

        // Put the decoded token into the cookies : 
        res.cookie('token', token, { maxAge: 1000 * 60 * 60, httpsOnly: true });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token
        });



    }


    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            message: 'Logout successful'
        });
    } catch (error) {
        return res.status(200).json({
            message: error.message
        });
    }
}