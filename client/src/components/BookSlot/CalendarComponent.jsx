// CalendarComponent.js

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent = ({ selectedDate, onSelect }) => {
  return (
    <div className="bg-white shadow-lg p-4 rounded z-10">
      <DatePicker
        inline
        selected={selectedDate}
        onChange={onSelect}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        className="border border-gray-300 p-2 rounded"
      />
    </div>
  );
};

export default CalendarComponent;
