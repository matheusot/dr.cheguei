const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const checkJWT = require('../middlewares/jwt.middleware').checkJWT;

/* Authentication Routes */
router.post('/', authController.authHC);
router.get('/checkAuth', checkJWT, authController.checkAuth);

module.exports = router;