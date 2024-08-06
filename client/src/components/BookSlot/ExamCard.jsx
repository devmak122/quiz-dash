// SlotCard.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CalendarComponent from './CalendarComponent';

const SlotCard = ({ slot, onBookSlot }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setDropdownOpen(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setDropdownOpen(false);
  };

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      onBookSlot(slot.id, selectedTime, selectedDate);
    } else {
      alert('Please select a date and time before booking!');
    }
  };

  const uniqueStyles = {
    // Define unique styles for each card here
    1: 'bg-gradient-to-r from-green-400 to-blue-500',
    2: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    3: 'bg-gradient-to-r from-yellow-500 to-orange-500',
  };

  return (
    <div className={`max-w-sm rounded-lg overflow-hidden shadow-lg p-6 relative text-white ${uniqueStyles[slot.id]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{slot.icon}</div>
        <div className="text-sm">
          <p className="font-semibold">{slot.specialty}</p>
          <p className={slot.available ? 'text-green-200' : 'text-red-200'}>
            {slot.available ? 'AVAILABLE' : 'FULL'}
          </p>
        </div>
      </div>
      <div className="font-bold text-2xl mb-2 text-center">{slot.title}</div>
      <p className="text-center mb-4">{slot.description}</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {slot.times.map((time, index) => (
          <button
            key={index}
            className={`bg-white text-black font-bold py-2 px-4 rounded transition duration-200 ease-in-out ${!slot.available && 'opacity-50 cursor-not-allowed'
              }`}
            onClick={() => slot.available && handleTimeClick(time)}
            disabled={!slot.available}
          >
            {time}
          </button>
        ))}
      </div>
      <div className="text-center mb-4">
        <p className="font-semibold">Selected Time: {selectedTime || 'None'}</p>
        <p className="font-semibold">Selected Date: {selectedDate ? selectedDate.toLocaleDateString('en-GB') : 'None'}</p>
      </div>
      {dropdownOpen && (
        <div className="absolute left-0 top-full mt-4 bg-white p-4 rounded shadow-lg z-10">
          <CalendarComponent
            selectedDate={selectedDate}
            onSelect={handleDateSelect}
          />
        </div>
      )}
      <button
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        onClick={handleBook}
        disabled={!slot.available}
      >
        Book Slot
      </button>
    </div>
  );
};

SlotCard.propTypes = {
  slot: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    times: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  onBookSlot: PropTypes.func.isRequired,
};

export default SlotCard;
