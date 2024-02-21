const express = require('express');
const router = express.Router();
const {signup , signin , getMe} = require('../controllers/userControllers');
const isAuthenticated = require('../middlewares/auth');

router.post('/signup' , signup);
router.post('/signin' , signin);
router.get('/me' , isAuthenticated , getMe);

module.exports = router;