import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/Login";
import Registration from "./pages/Register";
function App() {

  return (
    <>
    <Routes>
      
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<Registration />} />
    </Routes>    
    </>
  )
}

export default App
