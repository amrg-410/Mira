const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  movieName: { type: String, required: true },
  review: {type: String, required: true}
});

const items = mongoose.model('items', itemSchema);

module.exports = items;
