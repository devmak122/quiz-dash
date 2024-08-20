// routes/slots.js

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


// GET /api/slots/booked-slots/:email - Retrieve all slots for the specified email
router.get('/booked-slots/:email', fetchuser, async (req, res) => {
  try {
    console.log('User Email:', req.params.email); // Log user email for debugging

    const bookedSlots = await Slot.find({ 'user.email': req.params.email });
    // console.log('Fetched Slots:', bookedSlots); // Log fetched slots

    res.json(bookedSlots);
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({ message: 'Error fetching booked slots' });
  }
});



router.post('/remove/:id', fetchuser, async (req, res) => {
  try {
    const slotId = req.params.id;
    console.log('Slot ID:', slotId); // For debugging

    const slot = await Slot.findByIdAndDelete(slotId);

    if (!slot) {
      res.status(404).json({ message: 'Slot not found' });
      return;
    }

    res.status(200).json({ message: 'Slot removed successfully' });
  } catch (error) {
    console.error('Error removing slot:', error);
    res.status(500).json({ message: 'Failed to remove slot' });
  }
});
// DELETE /api/slots/remove-slot/:slotId
// router.delete('/remove-slot/:slotId', fetchuser, async (req, res) => {
//   try {
//     const { slotId } = req.params;
//     const userId = req.user.id;

//     console.log('Slot ID:', slotId); // Log the slot ID
//     console.log('User ID:', userId); // Log the user ID

//     // Find the slot by ID and make sure it belongs to the authenticated user
//     const slot = await Slot.findOne({ _id: req.params.id, 'user.email': req.user.email });
//     if (!slot) {
//       console.error('Slot not found or not authorized to delete'); // Log the error
//       console.error('Slot ID:', req.params.id); // Log the slot ID
//       console.error('User email:', req.user.email); // Log the user email
//       res.status(404).json({ error: 'Slot not found or not authorized to delete' });
//       return;
//     }
//     // Remove the slot
//     await slot.remove();

//     console.log('Slot removed successfully'); // Log the success message
//     return res.status(200).json({ message: 'Slot removed successfully' });
//   } catch (error) {
//     console.error('Error removing slot:', error.message); // Log the error message
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });



module.exports = router;