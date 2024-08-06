const express = require('express');
const Slot = require('../models/Slot');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

// POST /api/slots/book - Book a new slot
router.post('/book', fetchuser, async (req, res) => {
  const { name, specialty, time, date } = req.body;

  try {
    const slot = new Slot({
      name,
      specialty,
      time,
      date,
      userId: req.user.id,
    });
    await slot.save();
    res.status(200).json({ message: 'Slot booked successfully' });
  } catch (error) {
    console.error('Error booking slot:', error);
    res.status(500).json({ message: 'Failed to book slot' });
  }
});

// DELETE /api/slots/:id - Delete a booked slot
router.delete('/:id', fetchuser, async (req, res) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.status(200).json({ message: 'Slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting slot:', error);
    res.status(500).json({ message: 'Failed to delete slot' });
  }
});

// GET /api/slots - Retrieve all slots
router.get('/', fetchuser, async (req, res) => {
  try {
    const slots = await Slot.find({ userId: req.user.id });
    res.status(200).json(slots);
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ message: 'Failed to fetch slots' });
  }
});

module.exports = router;
