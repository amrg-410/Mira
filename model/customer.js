const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  paymentInfo: { type: String, required: true },
});

const User = mongoose.model('customers', userSchema);

module.exports = User;
