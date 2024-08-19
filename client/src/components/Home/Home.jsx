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
        console.log("Auth Token:", token);

        const response = await axios.get("http://localhost:5000/api/slots/booked-slots", {
          headers: {
            "auth-token": token,
          },
        });

        console.log("Booked Slots Response:", response.data); // Log response data
        setBookedSlots(response.data);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
        toast.error("Failed to load booked slots");
      }
    };

    fetchBookedSlots();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Booked Slots</h2>
      {bookedSlots.length === 0 ? (
        <p>No slots booked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookedSlots.map((slot, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h3 className="text-xl font-bold">{slot.name}</h3>
              <p><strong>Specialty:</strong> {slot.specialty}</p>
              <p><strong>Time:</strong> {slot.time}</p>
              <p><strong>Date:</strong> {new Date(slot.date).toLocaleDateString()}</p>
              <p><strong>User Name:</strong> {slot.user.username}</p>
              <p><strong>Email:</strong> {slot.user.email}</p>
              <p><strong>Phone:</strong> {slot.user.phone}</p>
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
