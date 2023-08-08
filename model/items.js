const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  amount:{type: Number, required: true},
  snacks:{type: String, required: true}
});

const items = mongoose.model('items', itemSchema);

module.exports = items;
