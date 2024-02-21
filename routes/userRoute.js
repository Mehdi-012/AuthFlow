const express = require('express');
const router = express.Router();
const { createUser, login, logout, } = require('../controllers/users');
const { checkToken } = require('../middlewares/checkTokenMiddleware.js'); // Correct');

router.post('/createUser', createUser);
router.post('/login', login);

router.get('/', checkToken, (req, res) => {
    console.log(req.cookies);

    res.send('Hello World');
})
router.post('/logout', logout);


module.exports = router;
