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
        <div className="relative min-h-screen overflow-hidden bg-radial bg-[#0B0A12] text-white font-serif brightness-100 opacity-95">
                <Navbar />
                
                <h1 className="flex flex-col items-center-safe text-4xl text-[#ff4f87] p-6">My Links</h1>
                <br/>
                { link.length===0?
                <p>Create a link to get started!</p>
                : <div className="max-w-6xl overflow-hidden border mx-auto mt-12 border-white rounded-md p-4">
                    <table className="w-full items-center">

                    <thead className="text-cyan-400 text-3xl text-left font-serif space-y-4">
                    <th>Link </th>
                    <th>Created At</th>
                    <th>Actions</th>
                    </thead>

                    <tbody>
                    {link.map((item) =>(
                            <tr key={item.id} className=" px-5 py-6 text-xl items-center">
                            <td className="p-4">{item.longUrl}</td>
                            <td className="p-4">{item.customSlug ? `localhost:3001/${item.customSlug}/${item.shortCode}`: `localhost:3001/${item.shortCode}`}</td>
                            <td className="p-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                        
                    </table>
                  </div>
                
                    
                }
                
            </div>
        </div>
    );

};

export default MyLinks;