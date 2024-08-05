import React from 'react';

const Sidebar = ({ setActivePage, handleLogout }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setActivePage('home')}>Home</li>
        <li onClick={() => setActivePage('book')}>Book Exam Slot</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
