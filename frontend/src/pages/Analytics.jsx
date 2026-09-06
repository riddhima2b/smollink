import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

const Analytics = () =>{

    const {id} = useParams();
    const [toast, setToast] = useState(null);
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get('/api/analytics/${id}', { withCredentials: true });
                setAnalytics(response.data);
            } catch (error) {
                console.error(error);
                setToast(error.response?.data?.error || "Failed to fetch analytics. Please try again.");
            }
        };

        fetchAnalytics();
    }, [id]);

    return (
        <div>
            <Toast message={toast} onClose={() => setToast(null)} />
            <div className="relative min-h-screen bg-radial bg-[#0B0A12] text-white font-serif brightness-100 opacity-95 pb-20">
                <Navbar />
                <h1 className="flex flex-col items-center-safe text-5xl text-[#ff4f87] p-6">Analytics</h1>
                {analytics ? (
                    <div className="max-w-6xl mx-auto mt-8 rounded-xl border border-white/10 bg-white/2 p-6">
                        {/* Render analytics data here */}
                        <pre>{JSON.stringify(analytics, null, 2)}</pre>
                    </div>
                ) : (
                    <p>Loading analytics...</p>
                )}
            </div>
        </div>
    );
}
export default Analytics;