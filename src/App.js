import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Browse from "./Browse";
import Profile from "./Profile";
import RunModel from "./RunModel";



function App() {
  return (
    <div >
      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/run/:modelId" element={<RunModel />} />
      </Routes>
    </div>
  );
}

export default App;