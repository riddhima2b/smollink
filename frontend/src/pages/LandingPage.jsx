import axios from "axios";
import { React, useState } from "react";
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
            <div className="relative min-h-screen overflow-hidden bg-[#0B0A12] font-serif brightness-100">
            
                <br/><br/>
                <h1 className="p-4 text-center text-6xl text-[#F5F3EF]">Long URLs are </h1>
                <h1 className="italic text-center text-6xl text-[#FF4D82]" >
                    booooring!
                </h1>
                <br/><br/>
                <p className="text-xl grid justify-center text-cyan-200 brightness-100">
                    Paste one below, and we'll make it smoll for you!
                </p>

                <br/><br/>

                <div className="flex-col flex items-center justify-center gap-2 px-4 py-6 p-6 rounded-md mx-auto rounded-md text-xl"> 
                    
                        <input type="text" value={longUrl} onChange={change} className="border border-blue-200 p-2 rounded-md w-1/2 text-white" />
                        <input type="text" value={shortUrl} readOnly className="border border-blue-200 p-2 mt-4 rounded-md text-white w-1/2 hover-blue">
                        </input> 
                        <button type="submit" className="border border-lime-500 bg-lime-500 p-2 mt-4 rounded-md text-black w-1/2 pointer-events-auto" onClick ={smollify}>Smollify</button>
                                     
                </div>
                
            </div>
        </>
    )
    
}
export default LandingPage;