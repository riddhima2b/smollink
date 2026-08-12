import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [toast, setToast] = useState(null);


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
            setIsRedirecting(true);
            setTimeout(() => navigate('/dashboard'), 1500);
            console.log(response.data.user);
            setToast('Login successful! Redirecting to dashboard...');
        }
        catch(error) {
            setToast(error.response.data.message || 'Login failed. Please try again.');
        }
    }
    if (isRedirecting) return <Spinner />;
    return(

        <>
            <Toast message={toast} onClose={() => setToast(null)} />
            <div className="relative min-h-screen overflow-hidden bg-radial bg-[#0B0A12] font-serif brightness-100 opacity-95 mb-10">
                <h1 className="flex justify px-8 py-4 text-3xl font-bold text-white">
                    
                    <Link to="/">S <span className="text-[#69ff4f]">.</span></Link> 
                </h1>            <br/><br/><br/> 
                <h1 className="py-4 text-center text-5xl text-[#FF4D82] mb-10">
                    
                    Welcome back! 
                    <h1 className="py-4 italic text-center text-4xl text-[#ffffff] bg-radial" >
                   Please log in to your account.
                </h1>
                </h1>            

                <form className="flex flex-col items-center gap-4 mx-auto rounded-2xl" onSubmit={handleLogin}>
                <h3 className="text-white text-xl"> Email </h3>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="text-xl border border-blue-200 p-2 rounded-md w-100 text-white" />
                    <h3 className="text-white text-xl"> Password </h3>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" className="text-xl border border-blue-200 p-2 rounded-md w-100 text-white " />
                    <button className="border border-lime-600 bg-radial bg-lime-400 p-2 mt-4 rounded-md text-black pointer-events-auto hover:bg-lime-700 hover:border-lime-200 w-100 text-2xl" type="submit">Login</button>

                </form>    

                <p className="text-center items-center mx-auto py-8 text-white brightness-100 mt-4 italic text-md-xl">
                        Don't have an account? <a href="/register" className="text-pink-600 hover:underline">Sign up</a> ➡️
                    </p>
            </div>
            <footer className="font-serif absolute bottom-0 w-full text-center py-4 text-white"><a href="https://github.com/riddhima2b" target="_blank" rel="noopener noreferrer" >© Riddhima, 2026</a></footer>
            <Toast message={toast} onClose={() => setToast(null)} />
        </>
    )


}

export default LoginPage;