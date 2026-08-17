import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";
const ProtectedRoute = ({ children }) => {
    const [status, setStatus] = useState('checking'); // 'checking' | 'authed' | 'unauthed'
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          await axios.get('/api/user', { withCredentials: true });
          setStatus('authed');
        } catch {
          setTimeout(() => setStatus('unauthed'), 1500);
        }
      };
      checkAuth();
    }, []);
  
    if (status === 'checking') return <Spinner />;
    if (status === 'unauthed') return <Navigate to="/login" replace />;
    return children;
  };
export default ProtectedRoute;