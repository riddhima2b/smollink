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
            <div className="min-h-screen w-full bg-white-400">
                <p className="p-6 grid grid-flow-col justify-items-center-safe font-semibold text-4xl font-serif text-black">Hello!</p>
                <br/><br/>

                <p className="p-4 grid grid-cols-1 justify-center-safe font-serif text-2xl text-black">
                    Welcome to SMOL-LINK, a simple and efficient URL shortening service that allows you to convert long URLs into shorter, more manageable links.
                </p>

                <br/><br/>
                <form className="flex flex-col items-center" onSubmit={smollify}>
                    <input type="text" value={longUrl} onChange={change} className="border border-black p-2 rounded-md w-1/2 text-black" />
                    <input type="text" value={shortUrl} readOnly className="border border-black p-2 mt-4 rounded-md text-black w-1/2"  />
                    <button type="submit" className="border border-black p-2 mt-4 rounded-md text-black w-1/2 pointer-events-auto">Smollify</button>
                </form>
            </div>
        </>
    )
    
}
export default LandingPage;