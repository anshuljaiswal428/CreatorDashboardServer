const mongoose = require('mongoose');  // Import mongoose
const { fetchTwitterPosts, fetchRedditPosts } = require('../utils/apiFetcher');
const Report = require('../models/reportModel');
const User = require("../models/userModel"); // Import User model
const Feed = require("../models/feedModel");

const getFeeds = async (req, res, next) => {
  try {
    // Fetch posts from each platform
    const twitterPosts = await fetchTwitterPosts('technology'); // You can customize the query here
    const redditPosts = await fetchRedditPosts();

    // Combine all posts into one array
    const combinedFeeds = [...twitterPosts, ...redditPosts];

    // Optionally shuffle the feeds (if needed)
    const shuffledFeeds = combinedFeeds.sort(() => Math.random() - 0.5);

    // Return the combined and shuffled feeds
    res.status(200).json({ success: true, feeds: shuffledFeeds });
  } catch (error) {
    next(error);
  }
};

const savePost = async (req, res, next) => {
  const { postId, platform, content } = req.body; // Post details from the client

  const session = await mongoose.startSession();  // Start a session for a transaction

  try {
    session.startTransaction();  // Begin transaction

    // Save the post in the Feed collection
    const newPost = new Feed({
      postId,
      platform,
      content,
    });

    await newPost.save({ session });  // Save in the Feed collection

    // Find the user by their ID (or another identifier such as email)
    const user = await User.findById(req.user.id).session(session);  // Get the user with the transaction session

    if (!user) {
      // If user is not found, abort the transaction and send error
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }

    // Push the post data into the user's savedPosts array
    user.savedPosts.push({
      postId,
      postContent: content,
      createdAt: new Date(),  // Date the post was saved
    });

    // Save the updated user document
    await user.save({ session });  // Save the user data with the transaction session

    // Commit the transaction
    await session.commitTransaction();

    // Respond with success message
    res.status(201).json({
      message: "Post saved successfully",
      savedPost: {
        postId,
        content,
        platform,
      },
    });

  } catch (error) {
    // In case of any error, abort the transaction
    await session.abortTransaction();
    next(error);  // Pass error to the next middleware
  } finally {
    // End the session
    session.endSession();
  }
};


// Report Post (Generic for Twitter or Reddit posts)
const reportPost = async (req, res, next) => {
  const { postId, platform, reason } = req.body; // Report reason
  try {
    const reportedPost = new Report({ postId, platform, reason });
    await reportedPost.save();
    res.status(201).json({ message: 'Post reported successfully', reportedPost });
  } catch (error) {
    next(error);
  }
};

// Delete a reported post (by report ID)
const deleteReportedPost = async (req, res, next) => {
  const reportId = req.params.id;

  try {
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Reported post not found" });
    }

    await Report.findByIdAndDelete(reportId);

    res.status(200).json({ message: "Reported post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFeeds, savePost, reportPost, deleteReportedPost };
