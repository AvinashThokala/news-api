const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imageUrl: { type: String },
  pdfUrl: { type: String },
});

module.exports = mongoose.model('News', NewsSchema);