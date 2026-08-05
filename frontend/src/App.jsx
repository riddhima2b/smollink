import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/Login";
function App() {

  return (
    <>
    <Routes>
      
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    </Routes>    
    </>
  )
}

export default App
