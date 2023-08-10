const mongoose = require('mongoose');

const dineSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    hotelName: { type: String, required: true },
    people: { type: String, required: true },
    timeSlot: { type: String, required: true}
});

const dine = mongoose.model('dines', userSchema);

module.exports = dine;
