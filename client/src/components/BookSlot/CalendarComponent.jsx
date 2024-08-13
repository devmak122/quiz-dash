import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent = ({ selectedDate, onSelect }) => {
  return (
    <div className="bg-gray-50 shadow-md p-5 rounded-lg">
      <DatePicker
        inline
        selected={selectedDate}
        onChange={onSelect}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        className="border border-gray-300 p-3 rounded-md focus:border-blue-500"
      />
    </div>
  );
};

export default CalendarComponent;