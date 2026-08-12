import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import MyLinks from "./pages/MyLinks";
import Registration from "./pages/Register";
function App() {

  return (
    <>
    <Routes>
      
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="mylinks" element={<ProtectedRoute><MyLinks /></ProtectedRoute>} />
    </Routes>    
    </>
  )
}

export default App
