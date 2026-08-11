import axios from "axios";
import { useEffect, useState } from "react";
import CopyButton from "../components/CopyButton";
import Navbar from "../components/Navbar";
const DashboardPage = () => {

    const [userName, setUser] = useState(null);
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [slug, setSlug] = useState("");
    const [getId, setUserId] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            try{
                const user = await axios.get('http://localhost:3001/api/user', {
                    withCredentials: true
                });
                const data = user.data.user.name;
                const id = user.data.user.userId;
                setUser(data);
                setUserId(id);
                
            }
            catch(Error)
            {
                console.error('Error:', Error);
            }
        }
        getUser();
    }, []);
    const change = (e) => {
        setLongUrl(e.target.value);
    };
    const slugChange = (e) => {
        setSlug(e.target.value);
    }

    const smollify = async(e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post('http://localhost:3001/api/shorten', 
 
                { userId : getId, url:longUrl, customSlug:slug},
            {
                headers: {
                    'Content-Type': 'application/json',                    
                },
                withCredentials: true
            },
                
            );
            setTimeout(() => {
                setShortUrl(response.data.shortUrl);
            }, 500);
        }
        catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    return(
        <div className="min-h-screen bg-[#1d1c22] text-[#f5f1eb] font-serif">

            <Navbar/>

            <main className="mx-auto max-w-6xl px-10 py-10">

                <h2 className="font-serif text-6xl font-bold">
                Hey <span className="text-[#ff4f87] ">{userName || 'User'}!</span>
                </h2>

                <div className="flex-col flex items-center justify-center gap-2 px-4 py-6 p-6 mx-auto rounded-md"> 

                <p className="mt-4 py-6 text-2xl text-[#9debf2]">
                    Let's make some URLs disappear!
                </p>
                    
                    <input type="text" value={longUrl} onChange={change} placeholder="https://example.com/your/very/long/url/here" className="border border-blue-200 p-2 rounded-md w-120 text-white" />
                 
                    <input type="text" value={slug} onChange={(slugChange)} placeholder="Add a custom key!" className="border border-blue-200 p-2 rounded-md w-120 text-white" />
                  
                    <div className="flex items-center gap-2 w-120 border border-cyan-300 bg-radial bg-[#087f99] p-2 rounded-md">
                   
                    <input type="text" value={shortUrl} readOnly placeholder = "shortened-url/here" className=" text-white flex-1"/>
                    <CopyButton text={shortUrl} />
                    </div>
                   
                    <button id ="smollink-button" className="border border-lime-600 bg-radial bg-lime-400 p-2 mt-4 rounded-md text-black w-120 pointer-events-auto hover:bg-lime-700 hover:border-lime-200" onClick ={smollify}>Smollify!</button>
                </div>
               

            </main>
            </div>
    )
}
export default DashboardPage;