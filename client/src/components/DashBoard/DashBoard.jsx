
//DashBoard.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiCalendar, FiLogOut, FiUser } from 'react-icons/fi';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import BookExamSlot from '../BookSlot/BookExamSlot';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('home');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Get user data from URL or localStorage
    const queryParams = new URLSearchParams(window.location.search);
    const userData = queryParams.get('user');
    const token = queryParams.get('token');

    if (userData) {
      const parsedUser = JSON.parse(decodeURIComponent(userData));
      if (parsedUser && parsedUser.name && parsedUser.email) {
        setUser(parsedUser);
        localStorage.setItem('user', JSON.stringify(parsedUser));
        localStorage.setItem('token', token); // Store the token if needed
      } else {
        console.error('Invalid user data');
      }
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.name && parsedUser.email) {
            setUser(parsedUser);
          } else {
            throw new Error('Invalid user data');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else {
        console.log('No valid user data found in localStorage');
        navigate('/login'); // Redirect to login if no user data
      }
    }
  }, [navigate]);
  

  const handlePageChange = (page) => {
    setActivePage(page);
    setDropdownOpen(false); // Close dropdown when changing page
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-1/5 bg-[#1D3D81] text-white flex flex-col justify-between h-screen shadow-lg">
          <div className="p-5">
            <h2 className="text-3xl font-bold text-red-500 mb-8">Skolar</h2>
            <ul className="space-y-4">
              <li
                className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-red-500 hover:text-white transition duration-300 ${activePage === 'home' ? 'bg-red-500 text-white' : ''}`}
                onClick={() => handlePageChange('home')}
              >
                <FiHome className="mr-3" />
                <span className="text-lg">Home</span>
              </li>
              <li
                className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-red-500 hover:text-white transition duration-300 ${activePage === 'book' ? 'bg-red-500 text-white' : ''}`}
                onClick={() => handlePageChange('book')}
              >
                <FiCalendar className="mr-3" />
                <span className="text-lg">Book Exam Slot</span>
              </li>
            </ul>
          </div>
          <div className="p-6 border-t border-gray-300 relative">
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="relative w-12 h-12">
                  <img
                    src="https://via.placeholder.com/150" // Replace with user's profile picture URL
                    alt="Profile"
                    className="w-full h-full rounded-full border-2 border-gray-300"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="ml-4">
                  {user ? (
                    <>
                      <span className="block text-sm">{user.email}</span>
                      <span className="block text-sm">{user.name}</span>
                    </>
                  ) : (
                    <span className="block text-lg font-medium">Loading...</span>
                  )}
                </div>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 top-0 mt-10 transform -translate-y-full w-64 bg-white text-gray-900 rounded-md shadow-lg z-50">
                  <ul className="py-2">
                    <li
                      className={`px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer ${activePage === 'Profile' ? 'bg-red-500 text-white' : ''}`}
                      onClick={() => handlePageChange('Profile')}
                    >
                      <div className="profile flex item-center p-1">
                        <FiUser className="mr-3 text-2xl" />
                        <span className="text-lg">Profile</span>
                      </div>
                      <div className="border-t-2"></div>
                    </li>
                    <li className="px-4 py-1 hover:bg-red-500 hover:text-white cursor-pointer">
                      <button
                        onClick={handleLogout}
                        className="flex items-center p-1 transition duration-300"
                      >
                        <FiLogOut className="mr-3 text-red-500 text-2xl" />
                        <span className="text-lg text-white-500">Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </aside>
        <main className="flex-grow p-8 overflow-y-auto">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
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
    </div>
  );
};

export default Dashboard;