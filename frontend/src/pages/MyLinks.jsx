import axios from "axios";
import { useEffect, useState } from "react";
import CopyButton from "../components/CopyButton";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
const MyLinks = () => {

    const [toast, setToast] = useState(null);
    const [link, setlinks] = useState([]);

    useEffect(() => {

        const fetchLinks = async() =>{
    
            try{
                const links = await axios.get(`${import.meta.env.VITE_API_URL}/api/mylinks`, 
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
        <div className="relative min-h-screen overflow-hidden bg-radial bg-[#0B0A12] text-white font-serif brightness-100 opacity-95 pb-20">
                <Navbar />
                
                <h1 className="flex flex-col items-center-safe text-5xl text-[#ff4f87] p-6">My Links</h1>

                { link.length===0?
                <p>Create a link to get started!</p>
                : <div className="max-w-6xl mx-auto mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/2">

                    <table className="w-full border-collapse">

                        <thead className="text-cyan-400 font-serif text-2xl">
                            <tr className="border-b border-white/10">
                                <th className="px-6 py-5 text-left">
                                    Link
                                </th>

                                <th className="px-6 py-5 text-left">
                                    Created At
                                </th>

                                <th className="px-6 py-5 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {link.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-white/[0.07] transition hover:bg-white/2.5">

                                    <td className="px-6 py-6">
                                        <div className="max-w-md space-y-2">
                                            <div className="truncate text-lg text-white/80">
                                                {item.longUrl}
                                            </div>

                                            <div className="text-md text-cyan-300/80">
                                            {item.customSlug
                                            ? `${import.meta.env.VITE_API_URL}/${item.customSlug}/${item.shortCode}`
                                            : `${import.meta.env.VITE_API_URL}/${item.shortCode}`}
                                            </div>

                                        </div>
                                    </td>

                                    <td className="px-6 py-6 text-lg text-white/60">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-6">
                                        <div className="flex px-6 gap-3 transition hover:border-cyan-400/40 hover:text-cyan-300">
                                    
                                                <CopyButton text={item.customSlug
                                                ? `${import.meta.env.VITE_API_URL}/${item.customSlug}/${item.shortCode}`
                                                : `${import.meta.env.VITE_API_URL}/${item.shortCode}`}/> 
                                            </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                    </div>
                    
                }
                <br/>
                
            </div>
        </div>
    );

};

export default MyLinks;