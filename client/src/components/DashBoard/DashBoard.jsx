import React, { useState } from 'react';
import Home from '../Home/Home';
import BookExamSlot from '../BookSlot/BookExamSlot';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('home');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li onClick={() => setActivePage('home')}>Home</li>
          <li onClick={() => setActivePage('book')}>Book Exam Slot</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className="main-content">
        {activePage === 'home' && <Home />}
        {activePage === 'book' && <BookExamSlot />}
      </div>
    </div>
  );
};

export default Dashboard;
