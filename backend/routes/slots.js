const express = require('express');
const router = express.Router();
const Slot = require('../models/slot');

// Fetch all slots
router.get('/slots', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Book a slot
router.post('/slots/book/:id', async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    if (!slot.available) return res.status(400).json({ message: 'Slot already booked' });

    slot.available = false;
    slot.bookedBy = req.user.id; // Assuming user ID is available from auth middleware
    await slot.save();

    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
