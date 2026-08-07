import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleRegistration = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post('http://localhost:3001/api/register',
            {email:email, password:password},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            alert('Login successful!');
            console.log(response.data.user);
        }
        catch(error) {
            console.error('Error:', error);
        }
    }

    return(

        <>
            <div className="relative min-h-screen overflow-hidden bg-radial bg-[#0B0A12] font-serif brightness-100 opacity-95 mb-6">
            <h1 className="flex justify px-8 py-4 text-3xl font-bold text-white">
                    
                    <Link to="/">S <span className="text-[#69ff4f]">.</span></Link> 
                </h1>
            <br/><br/><br/> 
                <h1 className="py-2 text-center text-5xl text-[#FF4D82] mb-10">
                    
                    Hey there!
                    <h1 className="py-2 text-center text-4xl text-[#ffffff] bg-radial italic" >
                    Create an account to get started!
                </h1>
                </h1>            

                <form className="flex flex-col items-center gap-4 mx-auto rounded-2xl" onSubmit={handleRegistration}>
                <h3 className="text-white"> Name </h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="border border-blue-200 p-2  rounded-md w-100 text-white" />
                <h3 className="text-white"> Email </h3>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="border border-blue-200 p-2  rounded-md w-100 text-white" />
                    <h3 className="text-white"> Password </h3>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" className="border border-blue-200 p-2 rounded-md w-100 text-white bg-radial " />
                    <button className="border border-lime-600 bg-radial bg-lime-400 p-2 mt-4 rounded-md text-black pointer-events-auto hover:bg-lime-700 hover:border-lime-200 w-100 text-xl" type="submit">Create Account</button>

                </form>    

                <p className="text-center items-center mx-auto py-8 text-white brightness-100 mt-4 italic">
                       Already have an account? <a href="/login" className="text-pink-600 hover:underline">Login </a>➡️
                    </p>
            </div>
            <footer className="font-serif absolute bottom-0 w-full text-center py-4 text-white"><a href="https://github.com/riddhima2b" target="_blank" rel="noopener noreferrer" >© Riddhima, 2026</a></footer>

        </>
    )


}

export default Registration;