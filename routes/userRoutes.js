const express = require('express');
const { getDashboard } = require('../controllers/userController');
const { addInteractionCredits, addProfileCredits } = require("../utils/creditManager");
const { protect } = require('../middlewares/authMiddleware'); // Protect routes

const router = express.Router();

// Route: GET /api/user/dashboard - User dashboard
router.get('/dashboard', protect, getDashboard);


// Route: POST /api/user/credits/profile-complete - Add credits for profile completion
router.post('/credits/profile-complete', protect, addProfileCredits);

// Route: POST /api/user/credits/interact - Add interaction credits (save, share, report)
router.post('/credits/interact', protect, addInteractionCredits);

module.exports = router;
