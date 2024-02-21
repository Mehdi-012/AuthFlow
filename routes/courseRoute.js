const express = require('express');
const router = express.Router();
const { createCourse } = require('../controllers/coursControllers'); // Correct the import path to point to the correct controller
const { checkToken } = require('../middlewares/checkTokenMiddleware'); // Correct');

router.post('/', checkToken, createCourse);

module.exports = router;