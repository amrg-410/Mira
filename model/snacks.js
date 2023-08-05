const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  snacksName: { type: String, required: true },
  img: { type: String, required: true, unique: true },
  price: { type: Number, required: true }
});

const snacks = mongoose.model('snacks', userSchema);

module.exports = snacks;
