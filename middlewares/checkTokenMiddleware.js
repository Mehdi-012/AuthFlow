const jwt = require('jsonwebtoken');

exports.checkToken = async (req, res, next) => {

    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(403).send({
            message: 'No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded;
        // if (decoded.role === 'admin') {
        //     return res.status(403).send({
        //         message: 'you dont have authorizations for this role'
        //     });
        // }
        // console.log(decoded);;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).send({
                message: 'Invalid token'
            });
        }
        // Handle other errors
        console.error('Token verification error:', error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
}
