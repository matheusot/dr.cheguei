const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const checkJWT = require('../middlewares/jwt.middleware').checkJWT;

/* User Routes */
router.get('/', checkJWT, userController.loggedInUserInfo);

module.exports = router;