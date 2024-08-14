import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    // Fetch booked slots for the user from the backend
    const fetchBookedSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/slots', {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });
        setBookedSlots(response.data);
      } catch (error) {
        toast.error('Failed to fetch booked slots');
      }
    };

    fetchBookedSlots();
  }, []);

  // Function to calculate the remaining time
  const calculateTimeRemaining = (date, time) => {
    const examDateTime = new Date(`${date} ${time}`);
    const currentTime = new Date();
    const timeDiff = examDateTime - currentTime;

    if (timeDiff <= 0) {
      return 'Exam started or passed';
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours and ${minutes} minutes remaining`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Booked Slots</h1>
      {bookedSlots.length === 0 ? (
        <p>No slots booked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedSlots.map((slot, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold">{slot.slotName}</div>
                <div className="text-sm text-gray-600">{slot.date}</div>
              </div>
              <div className="text-gray-800 mb-4">{slot.specialty}</div>
              <div className="text-gray-600">Time: {slot.time}</div>
              <div className="text-blue-600 font-bold">
                {calculateTimeRemaining(slot.date, slot.time)}
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Home;
