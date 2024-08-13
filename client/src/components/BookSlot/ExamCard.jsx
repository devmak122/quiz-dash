import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CalendarComponent from './CalendarComponent';

const SlotCard = ({ slot, onBookSlot }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateTimeSlots = (date) => {
    return [
      '11:00 AM - 1:00 PM',
      '1:00 PM - 3:00 PM',
      '3:00 PM - 5:00 PM',
      '5:00 PM - 6:00 PM',
    ];
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(generateTimeSlots(date)[0]);
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handleBook = () => {
    if (selectedDate && selectedTimeSlot) {
      onBookSlot(slot.id, selectedTimeSlot, selectedDate);
    } else {
      alert('Please select a date and time slot before booking!');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cardColors = {
    1: 'bg-blue-100 border-blue-500 text-blue-700',
    2: 'bg-purple-100 border-purple-500 text-purple-700',
    3: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  };

  return (
    <div className={`max-w-sm rounded-lg border-l-4 p-6 relative ${cardColors[slot.id]} shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">{slot.icon}</div>
        <div className="text-right">
          <p className="font-semibold text-lg">{slot.specialty}</p>
          <p className={slot.available ? 'text-green-500' : 'text-red-500'}>
            {slot.available ? 'AVAILABLE' : 'FULL'}
          </p>
        </div>
      </div>
      <div className="font-bold text-2xl mb-4">{slot.title}</div>
      <p className="mb-6">{slot.description}</p>

      <div className="mb-6">
        <button
          onClick={toggleModal}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Select Date & Time
        </button>
      </div>

      {selectedDate && selectedTimeSlot && (
        <div className="mb-4">
          <p className="font-semibold">Date: {selectedDate.toLocaleDateString('en-GB')}</p>
          <p className="font-semibold">Time Slot: {selectedTimeSlot}</p>
        </div>
      )}

      <button
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full hover:bg-blue-800"
        onClick={handleBook}
        disabled={!slot.available}
      >
        Book Slot
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">Select Date & Time Slot</h3>
              <button className="text-gray-500 hover:text-gray-800" onClick={toggleModal}>
                ✖
              </button>
            </div>
            <div className="mb-4">
              <CalendarComponent selectedDate={selectedDate} onSelect={handleDateSelect} />
            </div>
            <div className="mb-4">
              <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-2">
                Time Slot
              </label>
              <select
                id="timeSlot"
                value={selectedTimeSlot || ''}
                onChange={handleTimeSlotChange}
                className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {generateTimeSlots(selectedDate).map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                onClick={toggleModal}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
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
    icon: PropTypes.string.isRequired,
  }).isRequired,
  onBookSlot: PropTypes.func.isRequired,
};

export default SlotCard;