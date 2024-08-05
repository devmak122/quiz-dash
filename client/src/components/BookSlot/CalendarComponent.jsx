import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ date, onDateChange }) => {
  return (
    <div>
      <Calendar onChange={onDateChange} value={date} />
    </div>
  );
};

export default CalendarComponent;
