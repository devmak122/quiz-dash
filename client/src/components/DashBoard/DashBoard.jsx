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
    <div className="min-h-screen bg-white">
      <div className="flex laptop:flex-row mobile:flex-col tablet:flex-row h-full">

        {/* Sidebar for larger devices */}
        <aside className="fixed mobile:hidden tablet:hidden top-0 left-0 h-screen w-1/4 tablet:w-1/5 bg-gradient-to-b from-[#1D3D81] to-[#27368D] text-white flex flex-col justify-between shadow-xl z-10">
          <div className="p-5">
            <h2 className="text-4xl font-bold text-red-500 mb-10 tracking-wide">Mamo Academy</h2>
            <ul className="space-y-6">
              <li
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 hover:text-white ${activePage === 'home' ? 'bg-red-600 text-white' : ''}`}
                onClick={() => handlePageChange('home')}
              >
                <div className="p-2 bg-white rounded-full mr-3">
                  <FiHome className="text-red-600 text-xl" />
                </div>
                <span className="text-xl">Home</span>
              </li>
              <li
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 hover:text-white ${activePage === 'book' ? 'bg-red-600 text-white' : ''}`}
                onClick={() => handlePageChange('book')}
              >
                <div className="p-2 bg-white rounded-full mr-3">
                  <FiCalendar className="text-red-600 text-xl" />
                </div>
                <span className="text-xl">Book Exam Slot</span>
              </li>
            </ul>
          </div>

          <div className="p-6 border-t border-gray-300 relative">
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="relative w-14 h-14">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="w-full h-full rounded-full border-4 border-gray-300 shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="ml-4">
                  {user ? (
                    <>
                      <span className="block text-sm font-semibold">{user.email}</span>
                      <span className="block text-sm font-semibold">{user.name}</span>
                    </>
                  ) : (
                    <span className="block text-lg font-medium">Loading...</span>
                  )}
                </div>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 top-0 mt-10 transform -translate-y-full w-64 bg-white text-gray-900 rounded-md shadow-xl z-50">
                  <ul className="py-2">
                    <li
                      className={`px-4 py-3 hover:bg-red-600 hover:text-white cursor-pointer ${activePage === 'Profile' ? 'bg-red-600 text-white' : ''}`}
                      onClick={() => handlePageChange('Profile')}
                    >
                      <div className='flex '><FiUser className="mr-3 text-2xl" />
                      <span className="text-lg">Profile</span></div>
                    </li>
                    <li className="px-4 py-3 hover:bg-red-600 hover:text-white cursor-pointer">
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

        {/* Main content */}
        

        <main className="mobile:flex-grow p-8 overflow-y-auto laptop:ml-auto laptop:w-3/4 tablet:w-4/5 laptop:p-8 laptop:overflow-y-auto laptop:h-screen ">
          <header className="flex items-center  mobile:justify-center justify-between mb-6">
            <h1 className="text-4xl font-extrabold text-gray-900   p-3 ">
              {activePage === 'home' && 'Home'}
              {activePage === 'book' && 'Book Exam Slot'}
              {activePage === 'Profile' && 'Profile'}
            </h1>
          </header>
          <section className="bg-white  p-1">
            {activePage === 'home' && <Home />}
            {activePage === 'book' && <BookExamSlot />}
            {activePage === 'Profile' && <Profile />}
          </section>
        </main>


        {/* Bottom navigation for mobile and tablet */}
        <div className="flex laptop:hidden justify-around fixed bottom-0 w-full bg-[#1D3D81] text-white p-4 lg:p-3 shadow-lg rounded-t-xl z-50">
          <div
            className={`flex flex-col items-center justify-center ${activePage === 'home' ? 'text-red-500' : ''}`}
            onClick={() => handlePageChange('home')}
          >
            <FiHome className={`text-2xl lg:text-3xl ${activePage === 'home' ? 'text-red-500 transform scale-110' : 'text-white'}`} />
            <span className={`text-xs lg:text-sm mt-1 ${activePage === 'home' ? 'text-red-500' : ''}`}>Home</span>
          </div>
          <div
            className={`flex flex-col items-center justify-center ${activePage === 'book' ? 'text-red-500' : ''}`}
            onClick={() => handlePageChange('book')}
          >
            <FiCalendar className={`text-2xl lg:text-3xl ${activePage === 'book' ? 'text-red-500 transform scale-110' : 'text-white'}`} />
            <span className={`text-xs lg:text-sm mt-1 ${activePage === 'book' ? 'text-red-500' : ''}`}>Book Slot</span>
          </div>
          <div
            className={`flex flex-col items-center justify-center ${activePage === 'Profile' ? 'text-red-500' : ''}`}
            onClick={() => handlePageChange('Profile')}
          >
            <FiUser className={`text-2xl lg:text-3xl ${activePage === 'Profile' ? 'text-red-500 transform scale-110' : 'text-white'}`} />
            <span className={`text-xs lg:text-sm mt-1 ${activePage === 'Profile' ? 'text-red-500' : ''}`}>Profile</span>
          </div>
          <div
            className="flex flex-col items-center justify-center"
            onClick={handleLogout}
          >
            <FiLogOut className="text-2xl lg:text-3xl text-white hover:text-red-500 transition-transform duration-300" />
            <span className="text-xs lg:text-sm mt-1">Logout</span>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Dashboard;
