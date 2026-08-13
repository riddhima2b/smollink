import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
const MyLinks = () => {

    const [toast, setToast] = useState(null);
    const [link, setlinks] = useState([]);

    useEffect(() => {

        const fetchLinks = async() =>{
    
            try{
                const links = await axios.get('http://localhost:3001/api/mylinks', 
                { withCredentials: true });
                const data = links.data;
                console.log("API data:", data);
                setlinks(data);
            }
            catch(error){
                console.error(error);
                setToast(error.response?.data?.error || "Something went wrong. Please try again.");
            }

        }
        fetchLinks();
}, []);

    return (
        <div>
        <Toast message={toast} onClose={() => setToast(null)} />
            <div className="relative min-h-screen overflow-hidden bg-radial bg-[#0B0A12] text-white font-serif brightness-100 opacity-95 mb-10">
                <Navbar />
                
                <h1 className="flex flex-col items-center-safe text-4xl text-[#ff4f87] p-3">My Links</h1>
                <div className="text-white text-lg"><pre>{JSON.stringify(link, null, 2)}</pre></div>
            </div>
        </div>
    );

};

export default MyLinks;