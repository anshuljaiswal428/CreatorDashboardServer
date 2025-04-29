const User = require('../models/userModel');

// Add daily login credits
const addLoginCredits = async (userId) => {
  const user = await User.findById(userId);
  user.credits += 5; // Grant 5 credits for logging in
  await user.save();
};

// Add profile completion credits
const addProfileCompletionCredits = async (userId) => {
  const user = await User.findById(userId);
  if (!user.profileComplete) {
    user.profileComplete = true;
    user.credits += 10; // Grant 10 credits for completing profile
    await user.save();
  }
};

// Add interaction credits (e.g., saving posts or sharing)
const addInteractionCredits = async (userId, action) => {
  const user = await User.findById(userId);
  switch(action) {
    case 'save':
      user.credits += 3; // Grant 3 credits for saving a post
      break;
    case 'share':
      user.credits += 2; // Grant 2 credits for sharing a post
      break;
    case 'report':
      user.credits += 1; // Grant 1 credit for reporting a post
      break;
    default:
      break;
  }
  await user.save();
};

// Add credits when profile is completed
const addProfileCredits = async (req, res, next) => {
  try {
    await addProfileCompletionCredits(req.user.id);
    res.status(200).json({ success: true, message: 'Credits added for profile completion.' });
  } catch (error) {
    next(error);
  }
};


module.exports = { addLoginCredits, addProfileCompletionCredits, addInteractionCredits, addProfileCredits};
