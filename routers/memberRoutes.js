const express = require('express');
const router = express.Router();
const {createMember , deleteMember} = require('../controllers/memberControllers');
const isAuthenticated = require('../middlewares/auth');

router.post('/member' , isAuthenticated,  createMember);
router.delete('/member/:id' , isAuthenticated , deleteMember);

module.exports = router;