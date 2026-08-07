import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import CopyButton from "../components/CopyButton";
const LandingPage = () => {

    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const change = (e) => {
        setLongUrl(e.target.value);
    };

    const smollify = async(e) => {
        e.preventDefault();
        
        try{
            
            const response = await axios.post('http://localhost:3001/api/shorten', {url:longUrl},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setShortUrl(response.data.shortUrl);
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <>
            <div className="relative min-h-screen overflow-hidden bg-radial bg-[#0B0A12] font-serif brightness-100 opacity-95">

                <h1 className="flex justify px-8 py-4 text-3xl font-bold text-white">
                    
                    <Link to="/register">S <span className="text-[#69ff4f]">.</span></Link>
                </h1>
                <br/><br/><br/>
                <h1 className="py-4 text-center text-6xl text-[#F5F3EF]">Long URLs are </h1>
                <h1 className="italic text-center text-6xl text-[#FF4D82] bg-radial" >
                    booooring!
                </h1>
                <br/><br/>
                <p className="text-xl grid justify-center text-cyan-200 brightness-100">
                    Paste one below, and we'll make it smoll for you!
                </p>

                <br/><br/>

                <div className="flex-col flex items-center justify-center gap-2 px-4 py-6 p-6 mx-auto rounded-md text-xl"> 
                    
                    <input type="text" value={longUrl} onChange={change} placeholder="https://example.com/your/very/long/url/here" className="border border-blue-200 p-2 rounded-md w-1/2 text-white" />
                    <div className="flex items-center gap-2 w-1/2 border border-cyan-300 bg-radial bg-[#087f99] p-2 rounded-md">
                    <input type="text" value={shortUrl} readOnly placeholder = "shortened-url/here" className=" text-white flex-1"/>
                    <CopyButton text={shortUrl} />
                    </div>
                    <button id ="smollink-button" className="border border-lime-600 bg-radial bg-lime-400 p-2 mt-4 rounded-md text-black w-1/2 pointer-events-auto hover:bg-lime-700 hover:border-lime-200" onClick ={smollify}>Smollify!</button>
                    <br></br>
                    <p className="py-5 text-white brightness-100 mt-4 italic">
                            Psssst! Want more features? <a href="/register" className="text-pink-600 hover:underline">Sign up</a> for a free account!
                    </p>
          
                </div>
                <footer className="absolute bottom-0 w-full text-center py-4 text-white"><a href="https://github.com/riddhima2b" target="_blank" rel="noopener noreferrer" >© Riddhima, 2026</a></footer>
            </div>
        </>
    )
    
}
export default LandingPage;