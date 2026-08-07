import axios from "axios";
import { useEffect, useState } from "react";
const DashboardPage = () => {

    const [userName, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try{
                const user = await axios.get('http://localhost:3001/api/user', {
                    withCredentials: true
                });
                const data = user.data.user.name;
                setUser(data);
                
            }
            catch(Error)
            {
                console.error('Error:', Error);
            }
        }
        getUser();
    }, []);

    
    
    return(
        <div className="min-h-screen bg-[#1d1c22] text-[#f5f1eb] font-serif">

            <nav className="border-b border-[#f5f1eb]/20 px-10 py-5">
                <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    S <span className="text-[#69ff4f]">.</span>
                </h1>

                <div className="flex gap-8 text-md">
                    <span>My Links</span>
                    <span>Analytics</span>
                    <span className="text-[#69ff4f]">Logout</span>
                </div>
                </div>
            </nav>

            <main className="mx-auto max-w-6xl px-10 py-20">

                <h2 className="font-serif text-6xl font-bold">
                Hey, <span className="text-[#ff4f87]">{userName || 'User'}</span>
                </h2>

                <p className="mt-4 text-xl text-[#9debf2]">
                Let's make some URLs tiny.
                </p>

                {/* cards */}

            </main>
            </div>
    )
}
export default DashboardPage;