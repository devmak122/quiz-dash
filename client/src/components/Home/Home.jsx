import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

        console.log("Auth Token:", token);

        // Retrieve user data from localStorage
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

        console.log("Booked Slots Response:", response.data); // Log response data

        // Calculate remaining time for each booked slot
        const currentTime = new Date();
        const formattedBookedSlots = response.data.map((slot) => {
          const slotDate = new Date(slot.date);
          const timeDiff = slotDate - currentTime;

          let remainingTime = "";

          if (timeDiff <= 0) {
            remainingTime = "Slot has expired";
          } else {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

            remainingTime = `${days}d ${hours}h ${minutes}m`;
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


  const cardColors = {
    1: 'bg-blue-100 border-blue-500 text-blue-700',
    2: 'bg-purple-100 border-purple-500 text-purple-700',
    3: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Booked Slots</h2>
      {bookedSlots.length === 0 ? (
        <p>No slots booked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mb-20">
          {bookedSlots.map((slot, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h3 className="text-xl font-bold">{slot.name}</h3>
              <p><strong>User Name:</strong> {slot.user.username}</p>
              <p><strong>Specialty:</strong> {slot.specialty}</p>
              <p><strong>Time:</strong> {slot.time}</p>
              <p><strong>Date:</strong> {new Date(slot.date).toLocaleDateString()}</p>
              
              <p className={`text-red-600 ${slot.remainingTime === "Slot has expired" ? "font-bold" : ""}`}>
                <strong>Remaining Time:</strong> {slot.remainingTime}
              </p>
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