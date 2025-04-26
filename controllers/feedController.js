const { fetchTwitterPosts, fetchRedditPosts } = require('../utils/apiFetcher');
const Feed = require('../models/feedModel');
const Report = require('../models/reportModel');

// Fetch combined feeds from Twitter, and Reddit
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

// Save Post (Generic function for saving Twitter or Reddit posts)
const savePost = async (req, res, next) => {
  const { postId, platform, content } = req.body; // Post details from client
  try {
    const savedPost = new Feed({ postId, platform, content });
    await savedPost.save();
    res.status(201).json({ message: 'Post saved successfully', savedPost });
  } catch (error) {
    next(error);
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

module.exports = { getFeeds, savePost, reportPost };
