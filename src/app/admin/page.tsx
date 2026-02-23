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
    MessageSquare,
    Loader2,
    X,
    Archive,
    History,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const analyticsData = [
    { name: "Sigiriya Heritage Site", rating: 4.8, reviews: 125, location: "Matale District", visitors: "2.4k", revenue: "$12.4k", status: "Open for Booking", verified: true, image: "/images/sigiriya-clear.jpg" },
    { name: "Galle Fort Walk", rating: 4.9, reviews: 88, location: "Southern Province", visitors: "1.8k", revenue: "$8.9k", status: "Capacity Full", image: "/images/galle.jpg" },
    { name: "Ella Odyssey Train", rating: 5.0, reviews: 312, location: "Badulla District", visitors: "3.2k", revenue: "$15.6k", status: "Open for Booking", verified: true, image: "/images/nine-arch-bridge.jpg" },
    { name: "Anuradhapura Temple", rating: 4.7, reviews: 45, location: "North Central", visitors: "1.2k", revenue: "$4.2k", status: "Maintenance", image: "/images/nature.jpg" }
];

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        bookings: 1253,
        experiences: 245,
        unreadAlerts: 0,
        activeTours: 86,
        revenue: "$42.8k"
    });
    const [activeCategory, setActiveCategory] = useState("REVENUE ANALYTICS");
    const [activeSection, setActiveSection] = useState("ACTIVE REGISTRY");
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchDashboardStats = async () => {
        try {
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
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        // Simulate deletion log
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsDeleting(false);
        setDeleteId(null);
    };

    useEffect(() => {
        fetchDashboardStats();

        const channel = supabase
            .channel('dashboard-stats-realtime')
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
                    className="bg-accent/10 border border-accent/20 p-4 rounded-[2px] flex items-center justify-between shadow-xl shadow-accent/5"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent rounded-[2px] flex items-center justify-center text-primary shadow-lg shadow-accent/20">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-primary uppercase tracking-wider font-inter">Priority Attention Required</h4>
                            <p className="text-xs font-semibold text-primary/50 mt-1 font-inter">You have {stats.unreadAlerts} new guest inquiries awaiting response.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => window.location.href = '/admin/messages'}
                        className="bg-primary text-white px-6 py-2 rounded-[2px] text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-lg font-inter"
                    >
                        View Transmissions
                    </button>
                </motion.div>
            )}

            {/* 1. PORTAL HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight uppercase font-inter">Portal <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">Overview</span></h1>
                    <div className="flex items-center gap-4 mt-6">
                        <div className="bg-primary/5 px-4 py-2 rounded-[2px] border border-primary/5 flex items-center gap-3">
                            <Globe size={16} className="text-accent" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider font-inter">Global Traffic Active</span>
                        </div>
                        <p className="text-primary/40 font-bold text-xs uppercase tracking-widest bg-white px-3 py-1.5 rounded-[2px] border border-primary/5 shadow-sm font-inter">Last Synced: Just Now</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-primary/5 rounded-[2px] shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)] animate-pulse" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wider font-inter">Heritage Active</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent shadow-lg shadow-accent/20 rounded-[2px]">
                        <Award size={14} className="text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wider font-inter">Premium Tier</span>
                    </div>
                    <button className="p-2.5 text-primary/30 hover:text-primary border border-primary/5 bg-white rounded-[2px] transition-all hover:shadow-md">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>

            {/* 2. NAVIGATION TABS */}
            <div className="flex border-b border-primary/5 overflow-x-auto scrollbar-hide">
                {["REVENUE ANALYTICS", "DESTINATION STATS", "MANAGER PERFORMANCE"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveCategory(tab)}
                        className={`px-8 py-5 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap font-inter ${activeCategory === tab ? "text-primary" : "text-primary/30 hover:text-primary/60"}`}
                    >
                        {tab}
                        {activeCategory === tab && <motion.div layoutId="catTab" className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-accent rounded-t-full shadow-[0_-4px_10px_rgba(212,175,55,0.4)]" />}
                    </button>
                ))}
            </div>

            {/* 3. CORE ANALYTICS CARDS */}
            <div className="bg-white rounded-[2px] border border-primary/5 shadow-xl shadow-primary/5 overflow-hidden">
                <div className="grid grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-primary/5 font-inter">
                    {[
                        { label: "TOTAL BOOKINGS", val: stats.bookings, change: "+12%" },
                        { label: "AVG. EXPERIENCE", val: `$${stats.experiences}`, change: "+5%" },
                        { label: "UNREAD ALERTS", val: stats.unreadAlerts, alert: true, color: stats.unreadAlerts > 0 ? "text-orange-500" : "text-primary/20", full: true },
                        { label: "ACTIVE TOURS", val: stats.activeTours, change: "+24%" },
                        { label: "PORTAL REVENUE", val: stats.revenue, color: "text-accent" }
                    ].map((st, i) => (
                        <div key={i} className={`px-6 sm:px-10 py-10 sm:py-12 ${st.full ? 'col-span-2 lg:col-span-1 border-t lg:border-t-0' : ''}`}>
                            <div className="flex items-start justify-between mb-4">
                                <p className={`text-4xl sm:text-5xl font-bold leading-none tracking-tighter ${st.color || 'text-primary'}`}>{st.val}</p>
                                {st.change && <span className="text-xs font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-[2px]">{st.change}</span>}
                            </div>
                            <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em]">{st.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. SECTION TABS */}
            <div className="flex gap-10 border-b border-primary/5 bg-[#FAF9F6]/80 backdrop-blur-md z-30 pt-4 overflow-x-auto scrollbar-hide">
                {[
                    { name: "ACTIVE REGISTRY", count: 124 },
                    { name: "PENDING MODS", count: 8 },
                    { name: "MAINTENANCE", count: 3 },
                    { name: "USER FEEDBACK" },
                    { name: "INVOICING" }
                ].map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveSection(tab.name)}
                        className={`pb-5 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap font-inter ${activeSection === tab.name ? "text-primary" : "text-primary/30 hover:text-primary/60"}`}
                    >
                        <span className="flex items-center gap-3">
                            {tab.name}
                            {tab.count !== undefined && (
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeSection === tab.name ? "bg-primary text-accent shadow-lg" : "bg-primary/5 text-primary/20"}`}>
                                    {tab.count}
                                </span>
                            )}
                        </span>
                        {activeSection === tab.name && <motion.div layoutId="secTab" className="absolute bottom-[-1px] left-0 right-0 h-[4px] bg-accent rounded-t-lg" />}
                    </button>
                ))}
            </div>

            {/* 5. SEARCH & FILTER PORTAL */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h3 className="text-xs font-bold text-primary/40 uppercase tracking-widest font-inter">Signature Registry: {activeSection === "ACTIVE REGISTRY" ? "124 Sites Found" : "Restricted Access Content"}</h3>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={18} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Filter heritage sites..."
                            className="bg-white border border-primary/5 rounded-[2px] pl-12 pr-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/30 transition-all w-80 shadow-sm font-inter"
                        />
                    </div>
                    <button className="flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-[2px] text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-xl shadow-primary/20 group font-inter">
                        <Filter size={18} className="text-accent group-hover:scale-110 transition-transform" />
                        <span>Filters</span>
                    </button>
                </div>
            </div>

            {/* 6. DYNAMIC CONTENT GRID */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {activeSection === "ACTIVE REGISTRY" ? (
                        <motion.div
                            key="registry"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20"
                        >
                            {analyticsData.map((f, i) => (
                                <div key={i} className="bg-white rounded-[2px] border border-primary/5 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group relative">
                                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                                        <span className={`px-3 py-1.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider shadow-lg font-inter ${f.status === 'Open for Booking' ? 'bg-green-500 text-white' : f.status === 'Maintenance' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'}`}>
                                            {f.status}
                                        </span>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex items-start gap-4 mb-8">
                                            <div className="w-16 h-16 rounded-[2px] overflow-hidden bg-primary/5 border border-primary/5 relative flex-shrink-0 group-hover:scale-110 transition-transform duration-700">
                                                <Image src={f.image} alt={f.name} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-[15px] font-bold text-primary group-hover:text-accent transition-colors uppercase leading-tight font-inter">{f.name}</h4>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map(s => (
                                                            <Star key={s} size={10} className={`${s <= Math.floor(f.rating) ? 'fill-accent text-accent' : 'text-primary/10'}`} />
                                                        ))}
                                                    </div>
                                                    <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest font-inter">{f.rating} ({f.reviews})</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 divide-x divide-primary/5 py-6 border-y border-primary/5 mb-8 bg-[#FAF9F6]/50 rounded-[2px] px-4 font-inter">
                                            <div>
                                                <p className="text-[10px] font-bold text-primary uppercase">{f.location}</p>
                                                <p className="text-[9px] font-bold text-primary/20 uppercase tracking-widest mt-1">Registry Location</p>
                                            </div>
                                            <div className="pl-6">
                                                <p className="text-[10px] font-bold text-primary uppercase">{f.revenue}</p>
                                                <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest mt-1">+14.2% Growth</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button className="flex-1 flex items-center justify-center gap-3 px-4 py-4 border border-primary/10 rounded-[2px] text-primary/60 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/5 transition-all font-inter">
                                                <Activity size={14} className="text-accent" />
                                                Manage
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(f.name)}
                                                className="flex-1 flex items-center justify-center gap-3 px-4 py-4 bg-red-50 text-red-600 rounded-[2px] text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all font-inter"
                                            >
                                                <Plus size={14} className="rotate-45" />
                                                Purge
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="fallback"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-40 text-center space-y-6 bg-white rounded-[2px] border border-primary/5 border-dashed"
                        >
                            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary/20">
                                <Archive size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-primary uppercase tracking-tight font-inter">{activeSection} Data Storage</h3>
                                <p className="text-xs font-bold text-primary/30 uppercase tracking-widest font-inter">Requested module is currently under architectural review or synchronization.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* PREMIUM DELETE CONFIRMATION MODAL */}
            <AnimatePresence>
                {deleteId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDeleteId(null)}
                            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="bg-white w-full max-w-lg rounded-[2px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden relative"
                        >
                            <div className="absolute top-6 right-6">
                                <button onClick={() => setDeleteId(null)} className="text-primary/20 hover:text-red-500 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-12 text-center space-y-8">
                                <div className="relative mx-auto w-24 h-24">
                                    <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping" />
                                    <div className="relative w-full h-full bg-red-50 rounded-full flex items-center justify-center text-red-500 shadow-xl shadow-red-500/10">
                                        <AlertCircle size={48} strokeWidth={1.5} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-3xl font-bold text-primary uppercase tracking-tight font-inter">System Deletion Request</h3>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="h-[1px] w-8 bg-red-200" />
                                        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Protocol Alert</span>
                                        <div className="h-[1px] w-8 bg-red-200" />
                                    </div>
                                    <p className="text-[11px] font-bold text-primary/40 uppercase tracking-widest leading-loose max-w-sm mx-auto font-inter">
                                        Are you certain you wish to purge <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-[2px]">{deleteId}</span> from the heritage registry?
                                        <br /><span className="text-red-500/60 text-[9px]">CAUTION: This cryptographic action is permanent.</span>
                                    </p>
                                </div>

                                <div className="flex gap-4 font-inter">
                                    <button
                                        onClick={() => setDeleteId(null)}
                                        className="flex-1 px-8 py-5 border border-primary/5 rounded-[2px] text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary hover:bg-[#FAF9F6] transition-all"
                                    >
                                        Abort Request
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="flex-1 px-8 py-5 bg-red-600 text-white rounded-[2px] text-[10px] font-bold uppercase tracking-widest shadow-2xl shadow-red-600/30 hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isDeleting ? <Loader2 className="animate-spin" size={16} /> : <Archive size={16} />}
                                        <span>{isDeleting ? "Purging Registry..." : "Confirm Purge"}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-[#FAF9F6] py-5 px-12 border-t border-primary/5 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-primary/20">
                                    <History size={14} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">Action Log Sequence</span>
                                </div>
                                <span className="text-[9px] font-bold text-primary/30 uppercase tracking-widest px-3 py-1 bg-white border border-primary/5 rounded-[2px]">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
