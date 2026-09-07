import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";

const Analytics = () => {
    const { id } = useParams();

    const [analytics, setAnalytics] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get(
                    `/api/analytics/${id}`,
                    { withCredentials: true }
                );

                setAnalytics(response.data);
            } catch (error) {
                console.error(error);
                setToast(error.response?.data?.error || "Failed to fetch analytics. Please try again.");
            }
        };

        fetchAnalytics();
    }, [id]);

    if (!analytics) {
        return <Spinner />;
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-black text-white px-4 py-10 sm:px-8">
                <div className="mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="flex flex-col gap-6 border-b border-zinc-800 pb-8 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <p className="mb-2 text-xs font-medium tracking-[0.2em] text-zinc-500">
                                LINK ANALYTICS
                            </p>

                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Analytics
                            </h1>

                            <p className="mt-2 text-sm text-zinc-500">
                                snipppy.com/{analytics.shortCode}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">
                                Total clicks
                            </p>

                            <p className="mt-1 text-4xl font-semibold">
                                {analytics.totalClicks}
                            </p>
                        </div>

                    </div>


                    {/* Click Activity */}
                    <section className="mt-8">

                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-medium">
                                Click activity
                            </h2>

                            <span className="text-xs text-zinc-500">
                                Last 7 days
                            </span>
                        </div>

                        <div className="h-72 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

                            {/* Temporary chart */}
                            <div className="flex h-full items-end gap-2 sm:gap-4">

                                {[35, 52, 40, 75, 58, 90, 68].map(
                                    (height, index) => (
                                        <div
                                            key={index}
                                            className="flex-1 rounded-t-md bg-white/80 transition hover:bg-white"
                                            style={{
                                                height: `${height}%`,
                                            }}
                                        />
                                    )
                                )}

                            </div>

                        </div>
                    </section>


                    {/* Analytics breakdown */}
                    <div className="mt-6 grid gap-6 md:grid-cols-2">

                        <AnalyticsCard
                            title="Countries"
                            data={analytics.countries}
                        />

                        <AnalyticsCard
                            title="Devices"
                            data={analytics.devices}
                        />

                        <AnalyticsCard
                            title="Referrers"
                            data={analytics.referrers}
                        />

                    </div>

                </div>
            </main>

            {toast && (
                <Toast
                    toast={toast}
                    setToast={setToast}
                />
            )}
        </>
    );
};


const AnalyticsCard = ({ title, data }) => {

    const entries = Object.entries(data || {});

    const total = entries.reduce(
        (sum, [, value]) => sum + value,
        0
    );

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

            <h2 className="mb-6 text-lg font-medium">
                {title}
            </h2>

            <div className="space-y-5">

                {entries.map(([name, count]) => {

                    const percentage =
                        total === 0
                            ? 0
                            : Math.round((count / total) * 100);

                    return (
                        <div key={name}>

                            <div className="mb-2 flex items-center justify-between text-sm">

                                <span className="text-zinc-300">
                                    {name}
                                </span>

                                <span className="text-zinc-500">
                                    {count} · {percentage}%
                                </span>

                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">

                                <div
                                    className="h-full rounded-full bg-white transition-all"
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default Analytics;