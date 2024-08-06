import React from 'react';
import ExamSlotCard from './ExamSlotCard'; // Ensure correct import

const BookExamSlot = () => {
  const examSlots = [
    {
      name: 'Full Stack Development',
      available: 'AVAILABLE TODAY',
      
      times: ['11:00 AM TO 12:00 PM', '12:00 PM TO 1:00 PM', '1:00 AM TO 2:00 PM', '2:00 AM TO 3:00 PM', '3:00 AM TO 4:00 PM'],
    },
    {
      name: 'Full Stack Development',
      available: 'FULL',
      
      times: [],
    },
    {
      name: 'Front End Development',
      available: 'AVAILABLE TODAY',
      
      times: ['11:00 AM TO 12:00 PM', '12:00 PM TO 1:00 PM', '1:00 AM TO 2:00 PM', '2:00 AM TO 3:00 PM', '3:00 AM TO 4:00 PM'],
    },
    {
      name: 'Back End Development',
      available: 'AVAILABLE TODAY',
      
   times: ['11:00 AM TO 12:00 PM', '12:00 PM TO 1:00 PM', '1:00 AM TO 2:00 PM', '2:00 AM TO 3:00 PM', '3:00 AM TO 4:00 PM'],
    },
    {
      name: 'UI UX ',
      available: 'AVAILABLE TODAY',
      
   times: ['11:00 AM TO 12:00 PM', '12:00 PM TO 1:00 PM', '1:00 AM TO 2:00 PM', '2:00 AM TO 3:00 PM', '3:00 AM TO 4:00 PM'],
    },
    {
      name: 'Graphic Designer ',
      available: 'AVAILABLE TODAY',
      
      times: ['11:00 AM TO 12:00 PM', '12:00 PM TO 1:00 PM', '1:00 AM TO 2:00 PM', '2:00 AM TO 3:00 PM', '3:00 AM TO 4:00 PM'],
    },
    {
      name: 'Digital Marketing ',
      available: 'AVAILABLE TODAY',
      
      times: ['11:00 AM TO 12:00 PM', '12:00 PM TO 1:00 PM', '1:00 AM TO 2:00 PM', '2:00 AM TO 3:00 PM', '3:00 AM TO 4:00 PM'],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {examSlots.map((slot, index) => (
        <ExamSlotCard key={index} {...slot} />
      ))}
    </div>
  );
};

export default BookExamSlot;
