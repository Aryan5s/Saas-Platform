const express = require('express');
const router = express.Router();
const {createRole , getRoles} = require('../controllers/roleControllers')

router.post('/role' , createRole);
router.get('/role' , getRoles);

module.exports = router;