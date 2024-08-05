import React, { useState, useEffect } from 'react';
import CalendarComponent from './CalendarComponent';
import ExamCard from './ExamCard';
import axios from 'axios';
import './Slot.css';

const BookExamSlot = () => {
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [examDetails, setExamDetails] = useState([]);

  useEffect(() => {
    axios.get('/api/exams').then(response => {
      setExamDetails(response.data);
    });
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
    // Fetch available slots for the selected date from backend
    axios.get('/api/slots', { params: { date: date.toISOString().split('T')[0] } }).then(response => {
      setSlots(response.data);
    });
  };

  const handleSlotBooking = (slotId) => {
    // Implement slot booking logic here
    axios.post('/api/book-slot', { slotId }).then(response => {
      console.log(response.data);
    });
  };

  return (
    <div>
      <h1>Book Exam Slot</h1>
      <CalendarComponent date={date} onDateChange={handleDateChange} />
      <div className="slots">
        {slots.map(slot => (
          <div key={slot.id} className={`slot ${slot.isBusy ? 'busy' : ''}`} onClick={() => handleSlotBooking(slot.id)}>
            {slot.time}
          </div>
        ))}
      </div>
      <div className="exam-details">
        {examDetails.map(exam => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </div>
  );
};

export default BookExamSlot;
