const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  keyFilename: path.join(__dirname, 'C:/Users/avina/React/MERN/react-news-api-431523-0d915004c0f3.json'),
  // Alternatively, you can use double backslashes:
  // keyFilename: path.join(__dirname, 'C:\\Users\\avina\\React\\MERN\\react-news-api-431523-0d915004c0f3.json'),
});

const bucket = storage.bucket('files-and-photos-newsapi');

bucket.exists((err, exists) => {
  if (err) {
    console.error('Error checking if bucket exists:', err);
  } else if (!exists) {
    console.error('Bucket does not exist.');
  } else {
    console.log('Bucket exists:', bucket.name);
  }
});

module.exports = bucket;
