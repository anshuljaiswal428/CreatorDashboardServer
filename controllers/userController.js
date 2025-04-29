const User = require('../models/userModel');
const { addLoginCredits, addProfileCompletionCredits, addInteractionCredits } = require('../utils/creditManager');

// Dashboard: Fetch user's credit balance and recent activity
const getDashboard = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Assuming user ID is in req.user (set by authMiddleware)
    res.status(200).json({
      success: true,
      credits: user.credits,
      savedPosts: user.savedPosts,
      profileComplete: user.profileComplete,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
