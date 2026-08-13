import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async() => {
        
        try{
            await axios.post('http://localhost:3001/api/logout', {}, { withCredentials: true });
             navigate('/login');
        }catch(error){
            console.error("Error during logout:", error);
        }
        console.log("Logging out!");
    }

        return(
            <nav className="border-b border-[#f5f1eb]/20 px-10 py-5">
                <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    <Link to="/">S <span className="text-[#69ff4f]">.</span></Link>
                </h1>

                <div className="flex gap-8 text-xl">
                    <Link to="/mylinks"><span>My Links</span></Link>
                    <span>Analytics</span>
                    <button onClick={handleLogout}><span className="text-[#69ff4f]">Logout</span></button>
                </div>
                </div>
            </nav>
        )
}
export default Navbar;