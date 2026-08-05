import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post('http://localhost:3001/api/login',
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
            <div className="relative min-h-screen overflow-hidden bg-radial bg-[#0B0A12] font-serif brightness-100 opacity-95 mb-10">
            <br/><br/><br/> 
                <h1 className="p-10 py-6 gap-8 text-center text-[#FF4D82] text-5xl italic mb-10">
                    
                    Get started!
                </h1>            

                <form className="flex flex-col items-center px-6 py-8 gap-6 mx-auto rounded-2xl border border-white w-120" onSubmit={handleLogin}>
                <h3 className="text-white text-xl"> Email </h3>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email" className="border border-blue-200 p-2 rounded-md w-100 text-white" />
                    <h3 className="text-white text-xl"> Password </h3>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" className="border border-blue-200 p-2 rounded-md w-100 text-white" />
                    <button className="border border-lime-600 bg-radial bg-lime-400 p-2 mt-4 rounded-md text-black w-80 pointer-events-auto hover:bg-lime-700 hover:border-lime-200" type="submit">Login</button>

                </form>    
            </div>
        </>
    )


}

export default LoginPage;