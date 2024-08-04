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
          
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
