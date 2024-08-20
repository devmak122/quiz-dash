import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";

const HomePage = () => {
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in local storage");
          toast.error("Failed to load booked slots");
          return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          toast.error("User not found");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/slots/booked-slots/${user.email}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        const currentTime = new Date();

        const formattedBookedSlots = response.data.map((slot) => {
          const slotDate = new Date(slot.date);
          const currentDate = new Date(currentTime.toDateString());

          let remainingTime = "";

          if (slotDate < currentDate) {
            remainingTime = "Slot has expired";
          } else if (slotDate.toDateString() === currentDate.toDateString()) {
            remainingTime = "Slot is today";
          } else {
            const days = Math.floor(
              (slotDate - currentDate) / (1000 * 60 * 60 * 24)
            );
            remainingTime = `${days}d remaining`;
          }

          return { ...slot, remainingTime };
        });

        setBookedSlots(formattedBookedSlots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
        toast.error("Failed to load booked slots");
      }
    };
    fetchBookedSlots();
  }, []);

 
 // Function to remove a slot
 const removeSlot = async (slotId, index) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token not found. Cannot remove slot.");
      console.error('Token not found in local storage'); // Log the error
      return;
    }

    console.log('Slot ID:', slotId); // Log the slot ID

    await axios.delete(
      `http://localhost:5000/api/slots/remove/${slotId}`,
      {
        headers: {
          "auth-token": token,
        },
      }
    );

    // Remove the slot from the state after successful deletion from backend
    const updatedSlots = bookedSlots.filter((_, i) => i !== index);
    setBookedSlots(updatedSlots);

    toast.success("Slot removed successfully");
  } catch (error) {
    console.error('Error removing slot:', error); // Log the error
    toast.error("Failed to remove slot");
  }
};
  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Your Booked Slots
      </h2>
      {bookedSlots.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl text-gray-500 mb-4">
            You haven’t booked any slots yet.
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg transition-all duration-300">
            Book Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookedSlots.map((slot, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl shadow-lg bg-white transform hover:scale-105 transition-transform duration-300"
            >
              {/* Close (Remove) Icon */}
              <button
                onClick={() => removeSlot(slot._id, index)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
              >
                <FaTimes size={20} />
              </button>

              <div className="flex justify-between items-center mb-4">
                <div className="text-5xl text-blue-500">{slot.icon}</div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-gray-700">
                    {slot.specialty}
                  </p>
                  <p
                    className={`text-md mt-2 ${
                      slot.available ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {slot.available ? "AVAILABLE" : "FULL"}
                  </p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {slot.name}
              </h3>
              <p className="text-base mb-2">
                <strong>User Name:</strong> {slot.user.username}
              </p>
              <p className="text-base mb-2">
                <strong>Time:</strong> {slot.time}
              </p>
              <p className="text-base mb-2">
                <strong>Date:</strong>{" "}
                {new Date(slot.date).toLocaleDateString()}
              </p>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Time Left</span>
                  <span>{slot.remainingTime}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      slot.remainingTime === "Slot has expired"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${slot.remainingPercentage}%` }}
                  ></div>
                </div>
              </div>
              <button
                className={`w-full py-2 text-white rounded-full font-semibold transition-all duration-300 ${
                  slot.available
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!slot.available}
              >
                {slot.available ? "Book Slot" : "Not Available"}
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default HomePage;
