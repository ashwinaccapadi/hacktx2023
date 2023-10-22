import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Browse from "./Browse";
import Profile from "./Profile";



function App() {
  return (
    <div >
      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </div>
  );
}

export default App;