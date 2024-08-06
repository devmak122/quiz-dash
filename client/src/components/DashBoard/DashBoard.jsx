import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiCalendar, FiLogOut, FiUser } from 'react-icons/fi';
import Home from '../Home/Home';
import Profile from "../Profile/Profile";
import BookExamSlot from '../BookSlot/BookExamSlot';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('home');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

 

    


  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-1/5 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
        <div className="p-5">
          <h2 className="text-3xl font-bold mb-8">Skolar</h2>
          <ul className="space-y-4">
            <li
              className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-800 transition duration-300 ${activePage === 'home' ? 'bg-gray-800' : ''}`}
              onClick={() => setActivePage('home')}
            >
              <FiHome className="mr-3" />
              <span className="text-lg">Home</span>
            </li>
            <li
              className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-800 transition duration-300 ${activePage === 'book' ? 'bg-gray-800' : ''}`}
              onClick={() => setActivePage('book')}
            >
              <FiCalendar className="mr-3" />
              <span className="text-lg">Book Exam Slot</span>
            </li>
          </ul>
        </div>
        <div className="p-5 border-t border-gray-700 relative">
          <div className="relative">
            <div className="flex items-center cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)} ref={dropdownRef}>
              <div className="relative w-12 h-12">
                <img
                  src="https://via.placeholder.com/150" // Replace with user's profile picture URL
                  alt="Profile"
                  className="w-full h-full rounded-full border-2 border-gray-200"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="ml-4">
                <span className="block text-lg font-medium">Vishesh Patel</span>
                <span className="block text-sm text-gray-400">Student</span>
              </div>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 top-0 mt-10 transform -translate-y-full w-64 bg-white font-bold text-black rounded-md shadow-lg z-50">
                <ul className="py-2">
                <li   className={`px-4 py-2 hover:bg-gray-100 border-b-2 border-gray-300 cursor-pointer ${activePage === 'Profile' ? 'bg-gray-800' : ''}`}
              onClick={() => setActivePage('Profile')}
            >
              <span className="text-lg">Profile</span>
            </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><button
            onClick={handleLogout}
            className="flex items-center p-2  bg-whitetransition duration-300 text-black"
          >
            <FiLogOut className="mr-3" />
            <span className="text-lg">Logout</span>
          </button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </aside>
      <main className="flex-grow p-8 overflow-y-auto">
  <header className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-bold">
      {activePage === 'home' && 'Dashboard'}
      {activePage === 'book' && 'Book Exam Slot'}
      {activePage === 'Profile' && 'Profile'}
    </h1>
  </header>
  <section>
    {activePage === 'home' && <Home />}
    {activePage === 'book' && <BookExamSlot />}
    {activePage === 'Profile' && <Profile />}
  </section>
</main>

    </div>
  );
};

export default Dashboard;
