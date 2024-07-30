// src/App.js
import React from 'react';
import Login from './components/Login';
import SignUp from './components/Signup';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
            path="/SignUp"
            element={
              <>
                <SignUp />
              </>
            }
          />
          <Route path="/" exact>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
