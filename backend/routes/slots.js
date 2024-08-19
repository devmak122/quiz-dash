

//routes/slots.js

const express = require('express');
const Slot = require('../models/slot');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

// POST /api/slots/book - Book a new slot
router.post('/book', fetchuser, async (req, res) => {
    const { name, email, phone, slotName, specialty, time, date } = req.body;
    console.log('Request Body:', req.body); // For debugging

    try {
        const slot = new Slot({
            name: slotName, // Slot name from request
            specialty,
            time,
            date,
            user: {
                username: name || 'Anonymous', // Optional
                email, // Email from request
                phone // Phone from request
            }
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

// GET /api/slots/bookedslot - Retrieve all slots for the authenticated user// routes/slots.js (or wherever your routes are defined)
router.get('/booked-slots', fetchuser, async (req, res) => {
  try {
    console.log('User Email:', req.user.email); // Log user email for debugging

    const bookedSlots = await Slot.find({ 'user.email': req.user.email });
    console.log('Fetched Slots:', bookedSlots); // Log fetched slots

    res.json(bookedSlots);
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({ message: 'Error fetching booked slots' });
  }
});



module.exports = router;
