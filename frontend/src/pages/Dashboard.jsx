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

            <main className="mx-auto max-w-7xl px-6 py-6">

                <h2 className="font-serif text-5xl font-bold">
                Hey <span className="text-[#ff4f87]">{userName || 'User'}!</span>
                </h2>

                <div className="flex-col flex items-center justify-center gap-5 p-4 mx-auto rounded-md"> 

                <p className="text-2xl text-white font-serif text-center">
                    Let's make some URLs disappear!
                </p>
                    
                <form onSubmit={smollify} className="flex flex-col items-center justify-center gap-4 py-6">
                    <input type="text" value={longUrl} onChange={change} placeholder="https://example.com/your/very/long/url/here" className="border border-blue-200 rounded-md w-120 text-white p-2" />
                 
                    <div className="space-x-5">
                    <input type="text" value={slug} onChange={(slugChange)} placeholder="Add a custom link name!" className="border border-blue-200 p-2 rounded-md w-75 text-white" />
                    <button id ="smollink-button" className="border border-lime-600 bg-radial bg-lime-400 p-2 mt-4 rounded-md text-black w-40 pointer-events-auto hover:bg-lime-700 hover:border-lime-200" onClick ={smollify}>Smollify!</button>
                    </div>
                    <div className="my-3 flex items-center w-120 border border-cyan-300 bg-radial bg-[#087f99] p-2 rounded-md">
                    <input type="text" value={shortUrl} readOnly placeholder = "shortened-url/here" className=" text-white flex-1"/>
                    <CopyButton text={shortUrl} />
                    </div>
                   
                </form>

                <p className="py-6 text-xl ">HOW IT WORKS ✨</p>
                <div className="flex items-start justify-center rounded-md gap-16 text-xl">
                    <div className="text-center">
                        <span className="text-[#ff4f87]">01</span>
                        <p className="py-4 text-[#69ff4f]">Paste the URL</p>
                    </div>                   
                    <div className="text-center">
                        <span className="text-[#ff4f87]">02</span>
                        <p className="py-4 text-[#69ff4f]">Customise (optional)</p>
                    </div>                   
                    <div className="text-center">
                        <span className="text-[#ff4f87]">03</span>
                        <p className="py-4 text-[#69ff4f]"> Copy and Share!</p>
                    </div>                   

                </div>
                    
                </div>
               

            </main>
            <footer className="absolute bottom-0 w-full text-center py-4 text-white"><a href="https://github.com/riddhima2b" target="_blank" rel="noopener noreferrer" >© Riddhima, 2026</a></footer>
        </div>
    )
}
export default DashboardPage;