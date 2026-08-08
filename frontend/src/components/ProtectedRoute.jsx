// ProtectedRoute.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
    const [status, setStatus] = useState('checking'); // 'checking' | 'authed' | 'unauthed'
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          await axios.get('http://localhost:3001/api/user', { withCredentials: true });
          setStatus('authed');
        } catch {
          setStatus('unauthed');
        }
      };
      checkAuth();
    }, []);
  
    if (status === 'checking') return null; 
    if (status === 'unauthed') return <Navigate to="/login" replace />;
    return children;
  };
export default ProtectedRoute;