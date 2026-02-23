"use client";

import React, { useEffect, useState } from "react";
import {
    MoreVertical,
    Star,
    Award,
    Plus,
    Search,
    Filter,
    MapPin,
    Compass,
    Calendar,
    Globe,
    Activity,
    MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const analytics = [
    { name: "Sigiriya Heritage Site", rating: 4.8, reviews: 125, location: "Matale District", visitors: "2.4k", revenue: "$12.4k", status: "Open for Booking", verified: true, image: "/images/experience-1.jpg" },
    { name: "Galle Fort Walk", rating: 4.9, reviews: 88, location: "Southern Province", visitors: "1.8k", revenue: "$8.9k", status: "Capacity Full" },
    { name: "Ella Odyssey Train", rating: 5.0, reviews: 312, location: "Badulla District", visitors: "3.2k", revenue: "$15.6k", status: "Open for Booking", verified: true, image: "/images/experience-2.jpg" },
    { name: "Anuradhapura Temple", rating: 4.7, reviews: 45, location: "North Central", visitors: "1.2k", revenue: "$4.2k", status: "Maintenance", image: "/images/experience-3.jpg" }
];

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        bookings: 1253,
        experiences: 245,
        unreadAlerts: 0,
        activeTours: 86,
        revenue: "$42.8k"
    });

    const fetchDashboardStats = async () => {
        const { count: msgCount } = await supabase
            .from('contact_messages')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        const { count: reqCount } = await supabase
            .from('trip_requests')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        setStats(prev => ({
            ...prev,
            unreadAlerts: (msgCount || 0) + (reqCount || 0)
        }));
    };

    useEffect(() => {
        fetchDashboardStats();

        // Real-time subscription for dashboard counts
        const channel = supabase
            .channel('dashboard-stats')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => fetchDashboardStats())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'trip_requests' }, () => fetchDashboardStats())
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Real-time Alert Banner */}
            {stats.unreadAlerts > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-accent/10 border border-accent/20 p-4 rounded-2xl flex items-center justify-between shadow-xl shadow-accent/5"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary shadow-lg shadow-accent/20">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Priority Attention Required</h4>
                            <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mt-0.5">You have {stats.unreadAlerts} new guest inquiries awaiting response.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => window.location.href = '/admin/messages'}
                        className="bg-primary text-white px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                    >
                        View Transmissions
                    </button>
                </motion.div>
            )}

            {/* 1. PORTAL HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-heading font-black text-primary tracking-tight uppercase">Portal <span className="text-accent underline decoration-primary/10 underline-offset-8">Overview</span></h1>
                    <div className="flex items-center gap-3 mt-3">
                        <div className="bg-primary/5 px-3 py-1.5 rounded-md border border-primary/5 flex items-center gap-2">
                            <Globe size={14} className="text-accent" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Global Traffic Active</span>
                        </div>
                        <p className="text-primary/40 font-bold text-[11px] uppercase tracking-widest">Last Synced: Just Now</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-primary/5 rounded-xl shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)] animate-pulse" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Heritage Active</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent shadow-lg shadow-accent/20 rounded-xl">
                        <Award size={14} className="text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Premium Tier</span>
                    </div>
                    <button className="p-2.5 text-primary/30 hover:text-primary border border-primary/5 bg-white rounded-xl transition-all hover:shadow-md">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>

            {/* 2. NAVIGATION TABS - WEBSITE STYLE */}
            <div className="flex border-b border-primary/5 overflow-x-auto scrollbar-hide">
                {["REVENUE ANALYTICS", "DESTINATION STATS", "MANAGER PERFORMANCE"].map((tab, i) => (
                    <button
                        key={tab}
                        className={`px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${i === 0 ? "text-primary" : "text-primary/30 hover:text-primary/60"}`}
                    >
                        <div className="flex items-center gap-2">
                            {tab}
                        </div>
                        {i === 0 && <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-accent rounded-t-full shadow-[0_-4px_10px_rgba(212,175,55,0.4)]" />}
                    </button>
                ))}
            </div>

            {/* 3. CORE ANALYTICS CARDS */}
            <div className="bg-white rounded-[24px] border border-primary/5 shadow-xl shadow-primary/5 overflow-hidden">
                <div className="grid grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-primary/5">
                    {[
                        { label: "TOTAL BOOKINGS", val: stats.bookings, change: "+12%" },
                        { label: "AVG. EXPERIENCE", val: `$${stats.experiences}`, change: "+5%" },
                        { label: "UNREAD ALERTS", val: stats.unreadAlerts, alert: true, color: stats.unreadAlerts > 0 ? "text-orange-500" : "text-primary/20", full: true },
                        { label: "ACTIVE TOURS", val: stats.activeTours, change: "+24%" },
                        { label: "PORTAL REVENUE", val: stats.revenue, color: "text-accent" }
                    ].map((st, i) => (
                        <div key={i} className={`px-6 sm:px-10 py-8 sm:py-10 ${st.full ? 'col-span-2 lg:col-span-1 border-t lg:border-t-0' : ''}`}>
                            <div className="flex items-start justify-between mb-2">
                                <p className={`text-2xl sm:text-3xl font-heading font-black leading-none ${st.color || 'text-primary'}`}>{st.val}</p>
                                {st.change && <span className="text-[10px] font-black text-green-500">{st.change}</span>}
                            </div>
                            <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">{st.label}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-[#FAF9F6] px-6 sm:px-10 py-8 sm:py-10 border-t border-primary/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-12">
                    {[
                        { label: "REPORT PERIOD", val: "Feb 01 - Feb 23, 2026", icon: Calendar },
                        { label: "TOP REGION", val: "Central Highlands", icon: MapPin },
                        { label: "SYSTEM STATUS", val: "99.9% Operational", icon: Activity },
                        { label: "LICENSE NO", val: "TC-9283-HERITAGE", icon: Globe },
                        { label: "SENIOR ADMIN", val: "Admin User", icon: Star }
                    ].map((dt, i) => (
                        <div key={i}>
                            <p className="text-[10px] font-black text-primary/20 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                <dt.icon size={12} className="text-accent" />
                                {dt.label}
                            </p>
                            <p className="text-xs font-bold text-primary tracking-wide uppercase">{dt.val}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. SECTION TABS */}
            <div className="flex flex-wrap gap-10 border-b border-primary/5 sticky top-[72px] bg-[#FAF9F6]/80 backdrop-blur-md z-30 pt-4">
                {[
                    { name: "ACTIVE REGISTRY", count: 124 },
                    { name: "PENDING MODS", count: 8 },
                    { name: "MAINTENANCE", count: 3 },
                    { name: "USER FEEDBACK" },
                    { name: "INVOICING" }
                ].map((tab, i) => (
                    <button
                        key={tab.name}
                        className={`pb-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${i === 0 ? "text-primary" : "text-primary/30 hover:text-primary/60"}`}
                    >
                        <span className="flex items-center gap-3">
                            {tab.name}
                            {tab.count !== undefined && (
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${i === 0 ? "bg-primary text-accent shadow-lg" : "bg-primary/5 text-primary/20"}`}>
                                    {tab.count}
                                </span>
                            )}
                        </span>
                        {i === 0 && <div className="absolute bottom-[-1px] left-0 right-0 h-[4px] bg-accent rounded-t-lg" />}
                    </button>
                ))}
            </div>

            {/* 5. SEARCH & FILTER PORTAL */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h3 className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Signature Registry: 124 Sites Found</h3>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Filter heritage sites..."
                            className="bg-white border border-primary/5 rounded-xl pl-10 pr-4 py-3 text-[11px] font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all w-72 shadow-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border border-primary/5 rounded-xl text-primary/70 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-sm">
                        <Filter size={16} className="text-accent" />
                        <span>Filter Registry</span>
                    </button>
                </div>
            </div>

            {/* 6. DESTINATION GRID - PREMIUM STYLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                {analytics.map((f, i) => (
                    <div key={i} className="bg-white rounded-[24px] border border-primary/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group relative">
                        {/* Status Overlays */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg ${f.status === 'Capacity Full' ? 'bg-red-500 text-white' : f.status === 'Maintenance' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
                                {f.status}
                            </span>
                        </div>

                        <div className="p-8">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-primary/5 border border-primary/5 flex-shrink-0 relative group-hover:scale-110 transition-transform duration-500">
                                        {f.image ? (
                                            <Image src={f.image} alt={f.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-primary text-accent">
                                                <Compass size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-heading font-black text-primary group-hover:text-accent transition-colors uppercase leading-tight">
                                            {f.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} className={`${s <= Math.floor(f.rating) ? 'fill-accent text-accent' : 'text-primary/10'}`} />)}
                                            </div>
                                            <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{f.rating} ({f.reviews})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex divide-x divide-primary/5 py-6 border-y border-primary/5 mb-8 bg-[#FAF9F6]/50 rounded-xl px-4">
                                <div className="flex-1">
                                    <p className="text-[11px] font-black text-primary leading-tight uppercase tracking-tight">{f.location}</p>
                                    <p className="text-[9px] font-black text-primary/20 mt-1 uppercase tracking-[0.2em]">MATALE REGION</p>
                                </div>
                                <div className="flex-1 pl-6">
                                    <div className="flex items-center gap-2">
                                        <p className="text-[11px] font-black text-primary leading-tight uppercase">{f.revenue}</p>
                                        <span className="text-[9px] font-black text-green-500">+8%</span>
                                    </div>
                                    <p className="text-[9px] font-black text-primary/20 mt-1 uppercase tracking-[0.2em]">MONTHLY REV</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-4 border border-primary/10 rounded-xl text-primary/60 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/5 transition-all">
                                    <Activity size={14} className="text-accent" />
                                    <span>Analytics</span>
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/95 transition-all shadow-lg shadow-primary/20">
                                    <Plus size={14} className="text-accent" />
                                    <span>Edit Site</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
