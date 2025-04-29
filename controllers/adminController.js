const User = require('../models/userModel');
const Report = require('../models/reportModel');
const Feed = require('../models/feedModel'); // Assuming feed interactions are stored here

// View all users' credit balances
const viewUsersCredits = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' }).select('name email credits');
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

// Update user credits manually
const updateUserCredits = async (req, res, next) => {
  const { userId, credits } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.credits = credits;
    await user.save();

    res.status(200).json({ success: true, message: 'User credits updated successfully.' });
  } catch (error) {
    next(error);
  }
};

// Admin dashboard overview
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const activeUsers = await User.countDocuments({ role: 'user', isActive: true });
    const reportedContentCount = await Report.countDocuments();
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newSignups = await User.countDocuments({ createdAt: { $gte: oneWeekAgo }, role: 'user' });

    // Feed activity count (optional)
    const totalFeedPosts = await Feed.countDocuments(); // Optional enhancement

    res.status(200).json({
      totalUsers,
      activeUsers,
      reportedContentCount,
      newSignups,
      totalFeedPosts
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/admin/all-users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
  }
};

// Get all reported posts
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }); // Sort by most recent reports

    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    res.status(500).json({ success: false, message: "Failed to fetch reports", error: error.message });
  }
};


module.exports = {
  viewUsersCredits,
  updateUserCredits,
  getAdminDashboard,
  getAllUsers ,
  getAllReports
};
