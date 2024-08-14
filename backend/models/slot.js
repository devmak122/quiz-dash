
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  user: {
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false, // Adjust as needed
    }
  },
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
