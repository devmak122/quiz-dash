const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  examType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  available: { type: Boolean, default: true },
  bookedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Slot', slotSchema);
