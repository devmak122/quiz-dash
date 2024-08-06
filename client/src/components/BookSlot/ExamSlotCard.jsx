import React,{useState} from 'react';
import PropTypes from 'prop-types';
import CalendarComponent from './CalendarComponent';

const ExamSlotCard = ({ name, specialty, available, times }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>

        <div className="flex items-center my-4">
          
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{specialty}</p>
            <p className="text-green-500">{available}</p>
          </div>
        </div>
       
        <div className="grid grid-cols-3 gap-2">
          {times.map((time, index) => (
            <button
              key={index}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {time}
            </button>
          ))}
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            More times
            {dropdownOpen &&
             (
                <CalendarComponent/>
             )}
          </button>
        </div>
      </div>
    </div>
  );
};

ExamSlotCard.propTypes = {
  name: PropTypes.string.isRequired,

 
  available: PropTypes.string.isRequired,

  times: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ExamSlotCard;
