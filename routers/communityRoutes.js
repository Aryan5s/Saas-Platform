const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');
const {createCommunity , getAllCommunities , getCommunityMembers , getOwnedCommunities, getMyCommunities} =
require('../controllers/communityControllers')

router.post('/community' , isAuthenticated , createCommunity);
router.get('/community' , getAllCommunities);
router.get('/community/:id/members' , getCommunityMembers);
router.get('/community/me/owner' , isAuthenticated , getOwnedCommunities);
router.get('/community/me/member' , isAuthenticated ,  getMyCommunities);

module.exports = router;
