// src/App.js
import React from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from './components/DashBoard/Navbar';

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          
          <Route
            path="/"
            element={
              <>
                <SignUp />
             
                <ToastContainer />
               
              </>
            }
          />
          <Route path="/Dashboard" element={
            <Navbar/>
          }>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
