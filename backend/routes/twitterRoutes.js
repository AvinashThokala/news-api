const express = require('express');
const router = express.Router();
const { getTweets } = require('../controllers/twitterController');

router.get('/tweets', getTweets);

module.exports = router;