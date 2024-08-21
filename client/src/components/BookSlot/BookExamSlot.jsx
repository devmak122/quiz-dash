//BookExamSlot.js

import React from "react";
import axios from "axios";
import SlotCard from "./ExamCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SlotBooking = () => {
  const slotData = [
    {
      id: 1,
      title: "React Workshop",
      description: "Deep dive into React.js",
      specialty: "Web Development",
      available: true,
      times: ["11:00 AM-12:00 PM", "12:00 PM-1:00 PM", "1:00 PM-2:00 PM"],
      icon: "🌐",
    },
    {
      id: 2,
      title: "UI/UX Design Sprint",
      description: "Master the art of UI/UX",
      specialty: "Design",
      available: false,
      times: ["2:00 PM", "3:00 PM"],
      icon: "🎨",
    },
    {
      id: 3,
      title: "DSA",
      description: "Learn essential algorithms",
      specialty: "Computer Science",
      available: true,
      times: ["4:00 PM", "5:00 PM", "6:00 PM"],
      icon: "💻",
    },
    {
      id: 4,
      title: "Java Spring Boot",
      description: "Design Web page iwth java framework",
      specialty: "Computer Science",
      available: true,
      times: ["4:00 PM", "5:00 PM", "6:00 PM"],
      icon: "💻",
    },
    {
      id: 5,
      title: "Digital Marketing",
      description: "Become SEO Expert ",
      specialty: "Marketing",
      available: true,
      times: ["4:00 PM", "5:00 PM", "6:00 PM"],
      icon: "💻",
    },
    
  ];

  const handleBookSlot = async (slotId, time, date) => {
    const formattedDate = date
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("-");
    const slot = slotData.find((s) => s.id === slotId);

    if (!slot) {
      toast.error("Slot not found");
      return;
    }

    try {
      // Retrieve user data from localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.error("User not found");
        return;
      }

      // Prepare the combined data for backend submission
      const bookingData = {
        name: user.name, // From user profile, not displayed in UI
        email: user.email, // From user profile, not displayed in UI
        phone: user.phone, // From user profile, not displayed in UI
        slotName: slot.title, // From slot data
        specialty: slot.specialty, // From slot data
        time,
        date: formattedDate,
      };

      // Send the booking data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/slots/book",
        bookingData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      // Handle success and error
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error booking slot:", error);
      toast.error("Failed to book slot");
    }
  };

  return (
    <div className="mobile:overflow-y-clip ">
    <div className="p-6 mobile:p-3 grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8">
      {slotData.map((slot) => (
        <SlotCard key={slot.id} slot={slot} onBookSlot={handleBookSlot} />
      ))}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
      </div>
    </div>
  );
};

export default SlotBooking;
