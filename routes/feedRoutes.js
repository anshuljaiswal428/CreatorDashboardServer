// /backend/routes/feedRoutes.js
const express = require('express');
const { getFeeds, savePost, reportPost, deleteReportedPost } = require('../controllers/feedController');
const { protect } = require('../middlewares/authMiddleware'); // if you want to protect route (optional)

const router = express.Router();

// Route: GET /api/feed
router.get('/', protect, getFeeds);
router.post('/save', protect, savePost);
router.post('/report', protect, reportPost);
router.delete('/report/:id', protect, deleteReportedPost);

module.exports = router;
