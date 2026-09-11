import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CopyButton from "../components/CopyButton";
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

    const shortUrl = analytics.customSlug
        ? `https://www.snipppy.com/${analytics.customSlug}`
        : `https://www.snipppy.com/${analytics.shortCode}`;

    return (
        <>
           

            <div className="relative min-h-screen bg-radial bg-[#0B0A12] text-white font-serif brightness-100 opacity-95 pb-20">
            <Navbar />
                <div className="max-w-6xl mx-auto px-4 pt-10">

                    {/* Header card */}
                    <div className="rounded-xl border border-white/10 bg-white/2 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="min-w-0">
                            <h2 className="text-xl tracking-[0.2em] text-lime-400 mb-1">
                                LINK ANALYTICS
                            </h2>

                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-xl text-cyan-300/90 truncate">
                                    {shortUrl}
                                </span>
                                <CopyButton text={shortUrl} />
                            </div>

                            <p className="mt-2 text-sm text-white/50 truncate max-w-md" title={analytics.longUrl}>
                                {analytics.longUrl}
                            </p>
                        </div>

                        <div className="shrink-0 text-center sm:text-right">
                            <p className="text-sm text-white/50">Total clicks</p>
                            <p className="text-4xl text-[#ff4f87]">
                                {analytics.totalClicks}
                            </p>
                        </div>

                    </div>

                    {/* Breakdown cards */}
                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <AnalyticsCard title="Countries" data={analytics.formattedCountries} labelKey="country" />
                        <AnalyticsCard title="Devices" data={analytics.formattedDevices} labelKey="device" />
                        <AnalyticsCard title="Referrers" data={analytics.formattedRefferers} labelKey="referrer" />
                        <RecentClicksCard data={analytics.formattedRecentClicks} />
                    </div>

                </div>
            </div>

            {toast && (
                <Toast toast={toast} setToast={setToast} />
            )}
        </>
    );
};

const AnalyticsCard = ({ title, data, labelKey }) => {

    const entries = data || [];
    const total = entries.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="rounded-xl border border-white/10 bg-white/2 p-6">
            <h2 className="text-lg text-cyan-400 mb-5">{title}</h2>

            {entries.length === 0 ? (
                <p className="text-sm text-white/40">No data yet</p>
            ) : (
                <div className="space-y-4">
                    {entries.map((item) => {
                        const percentage = total === 0 ? 0 : Math.round((item.count / total) * 100);

                        return (
                            <div key={item[labelKey]}>
                                <div className="mb-1.5 flex items-center justify-between text-sm">
                                    <span className="text-white/80">{item[labelKey]}</span>
                                    <span className="text-white/40">{item.count} · {percentage}%</span>
                                </div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-[#ff4f87] transition-all"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const RecentClicksCard = ({ data }) => {

    const clicks = data || [];

    return (
        <div className="rounded-xl border border-white/10 bg-white/2 p-6 md:col-span-2">

            <h2 className="text-lg text-cyan-400 mb-5">
                Recent activity
            </h2>

            {clicks.length === 0 ? (
                <p className="text-sm text-white/40">No clicks yet</p>
            ) : (
                <div className="space-y-3">
                    {clicks.map((click, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between text-sm border-b border-white/6 pb-3 last:border-0 last:pb-0"
                        >
                            <span className="text-white/70">{click.device}</span>
                            <span className="text-white/50">{click.country}</span>
                            <span className="text-white/50">{click.referrer}</span>
                            <span className="text-white/30 text-xs">
                                {new Date(click.timestamp).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Analytics;