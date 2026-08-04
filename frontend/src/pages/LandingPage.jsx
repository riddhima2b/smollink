import axios from "axios";
import { React, useState } from "react";
import CopyButton from "../components/CopyButton";
const LandingPage = () => {

    const [longUrl, setLongUrl] = useState("https://example.com/your/very/long/url/here");
    const [shortUrl, setShortUrl] = useState("shortened-url/here");

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
            <div className="relative min-h-screen overflow-hidden bg-radial from-black to-black font-serif brightness-100 opacity-95">
            
                <br/><br/><br/>
                <h1 className="py-4 text-center text-6xl text-[#F5F3EF]">Long URLs are </h1>
                <h1 className="italic text-center text-6xl text-[#FF4D82]" >
                    booooring!
                </h1>
                <br/><br/>
                <p className="text-xl grid justify-center text-cyan-200 brightness-100">
                    Paste one below, and we'll make it smoll for you!
                </p>

                <br/><br/>

                <div className="flex-col flex items-center justify-center gap-2 px-4 py-6 p-6 mx-auto rounded-md text-xl"> 
                    
                    <input type="text" value={longUrl} onChange={change} className="border border-blue-200 p-2 rounded-md w-1/2 text-white" />
                    <div className="flex items-center gap-2 w-1/2 border border-cyan-300  bg-cyan-600  p-2 rounded-md">
                    <input type="text" value={shortUrl} readOnly className=" text-white flex-1"/>
                    <CopyButton text={shortUrl} />
                    </div>
                    <button className="border border-lime-600 bg-lime-400 p-2 mt-4 rounded-md text-black w-1/2 pointer-events-auto hover:bg-lime-600 hover:border-lime-200" onClick ={smollify}>Smollify!</button>
          
                </div>
                <footer className="absolute bottom-0 w-full text-center py-4 text-[#FF4D82]"><a href="https://github.com/riddhima2b" target="_blank" rel="noopener noreferrer" >© Riddhima, 2026</a></footer>
            </div>
        </>
    )
    
}
export default LandingPage;