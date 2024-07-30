import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa"; 

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = credentials;

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password, confirmPassword }),
      });

      let json;
      try {
        json = await response.json();
      } catch (error) {
        throw new Error("Received non-JSON response from server.");
      }

      if (json.token) {
        localStorage.setItem("token", json.token);
        navigate("/login");
        alert("Account created successfully");
      } else {
        alert("Error: " + (json.error || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your details to create your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            placeholder="Name"
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            placeholder="Email"
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            type="text"
            id="phone"
            name="phone"
            value={credentials.phone}
            onChange={onChange}
            placeholder="Phone No"
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            placeholder="Password"
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            required
          />
          <button
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline"
            type="submit"
          >
                        Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-gray-500">— Or sign up with —</div>
        
        <p className="mt-6 text-xs text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-green-500">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
