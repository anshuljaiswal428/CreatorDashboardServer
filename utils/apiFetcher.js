const axios = require('axios');

// Fetch Twitter posts
async function fetchTwitterPosts(query) {
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=10&tweet.fields=author_id,created_at`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });
        return response.data.data.map(post => ({
            id: post.id,
            platform: 'Twitter',
            content: post.text,
            author: post.author_id,
            created_at: post.created_at,
        }));
    } catch (error) {
        console.error('Error fetching Twitter posts:', error.response?.data || error.message);
        // Return static dummy Twitter posts in case of error
        return [
            {
                id: 'dummy-twitter-1',
                platform: 'Twitter',
                content: `This is a fallback Twitter post about ${query}`,
                author: 'user123',
                created_at: new Date().toISOString(),
            },
            {
                id: 'dummy-twitter-2',
                platform: 'Twitter',
                content: `Another fallback post mentioning ${query}`,
                author: 'user456',
                created_at: new Date().toISOString(),
            },
        ];
    }
}

// Fetch Reddit posts
async function fetchRedditPosts(subreddit = 'all') {
    const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=10`;

    try {
        const response = await axios.get(url);
        return response.data.data.children.map(post => ({
            id: post.data.id,
            platform: 'Reddit',
            content: post.data.title,
            author: post.data.author,
            created_at: new Date(post.data.created_utc * 1000).toISOString(),
            url: post.data.url,
        }));
    } catch (error) {
        console.error('Error fetching Reddit posts:', error.response?.data || error.message);
        // Return static dummy Reddit posts in case of error
        return [
            {
                id: 'dummy-reddit-1',
                platform: 'Reddit',
                content: 'This is a fallback Reddit post about technology',
                author: 'reddituser123',
                created_at: new Date().toISOString(),
                url: 'https://www.reddit.com/r/technology',
            },
            {
                id: 'dummy-reddit-2',
                platform: 'Reddit',
                content: 'Another fallback Reddit post on technology',
                author: 'reddituser456',
                created_at: new Date().toISOString(),
                url: 'https://www.reddit.com/r/technology',
            },
        ];
    }
}

module.exports = { fetchTwitterPosts, fetchRedditPosts };
