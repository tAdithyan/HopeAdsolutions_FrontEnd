import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, FileText, Tag, TrendingUp, Mail } from "lucide-react";
import { getDashboardStats } from "../../data/dashboard";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to load dashboard stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF8A00]"></div>
            </div>
        );
    }

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-['Oswald'] text-3xl font-bold text-[#111827]">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase">Total Visitors</p>
                        <p className="text-2xl font-bold text-[#111827]">{stats?.totalVisitors?.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 text-[#FF8A00] flex items-center justify-center">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase">Active Blogs</p>
                        <p className="text-2xl font-bold text-[#111827]">{stats?.blogs}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Tag size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase">Active Offers</p>
                        <p className="text-2xl font-bold text-[#111827]">{stats?.offers}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                        <Mail size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase">Submissions</p>
                        <p className="text-2xl font-bold text-[#111827]">{stats?.contacts}</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visitor Location Chart */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-['Oswald'] text-xl font-bold text-[#111827] mb-6">Visitor Traffic by Location (City)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats?.visitsData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                    cursor={{ fill: '#f9fafb' }}
                                />
                                <Bar dataKey="visitors" fill="#FF8A00" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>


            </div>
            <a href="https://www.seobility.net/en/seocheck/check?url=https%3A%2F%2Fcompany-website-sand-nine.vercel.app%2F"><img src="https://app.seobility.net/widget/widget.png?url=https%3A%2F%2Fcompany-website-sand-nine.vercel.app%2F" alt="Seobility Score for company-website-sand-nine.vercel.app" /></a>
        </div>
    );
};

export default Dashboard;

