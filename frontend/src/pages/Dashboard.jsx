import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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

            <Navbar/>

            <main className="mx-auto max-w-6xl px-10 py-20">

                <h2 className="font-serif text-6xl font-bold">
                Hey, <span className="text-[#ff4f87]">{userName || 'User'}</span>
                </h2>

                <p className="mt-4 text-xl text-[#9debf2]">
                Let's make some URLs disappear!
                </p>

               

            </main>
            </div>
    )
}
export default DashboardPage;