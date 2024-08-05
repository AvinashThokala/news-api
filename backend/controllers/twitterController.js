// backend/controllers/twitterController.js
const twitterClient = require('../utils/twitterClient');

exports.getTweets = async (req, res) => {
  try {
    const tweets = await twitterClient.get('statuses/user_timeline', { screen_name: 'AvinashThokala1', count: 10 });
    res.json(tweets);
  } catch (error) {
    console.error('Twitter API Error:', error);
    if (error.errors) {
      // Twitter API specific errors
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: 'Error fetching tweets from Twitter API' });
    }
  }
};