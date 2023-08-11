const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emailId: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    purpose: { type: String, required: true },
    slot: { type: Date, required: true },
    attendees:{ type: Number, required: true}
});

const events = mongoose.model('events', eventSchema);

module.exports = events;
