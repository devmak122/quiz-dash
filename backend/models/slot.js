// models/Slot.js

const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Slot', slotSchema);
