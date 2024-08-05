const axios = require('axios');

exports.getNews = async (req, res) => {
  try {
    const category = req.query.category || 'general';
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: 'us',
        category: category,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
