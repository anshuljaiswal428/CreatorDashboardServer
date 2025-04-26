// /backend/routes/feedRoutes.js

const express = require('express');
const { getFeeds, savePost, reportPost } = require('../controllers/feedController');
const { protect } = require('../middlewares/authMiddleware'); // if you want to protect route (optional)

const router = express.Router();

// Route: GET /api/feed
router.get('/', protect, getFeeds);
router.post('/save', protect, savePost);
router.post('/report', protect, reportPost);

module.exports = router;
