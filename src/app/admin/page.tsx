"use client";

import React from "react";
import {
    Users,
    MoreHorizontal,
    ArrowUpRight,
    TrendingUp,
    Shield,
    HardDrive,
    Save,
    Calendar,
    ChevronDown,
    Activity,
    MousePointer2,
    Eye
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    return (
        <div className="space-y-10">
            {/* 1. HEADER */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard <span className="text-slate-400 font-bold ml-2 text-sm">Trip Traffic</span></h2>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-[#E6EEF8] p-1.5 rounded-2xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_4px_10px_rgba(0,0,0,0.05)]">
                        <div className="flex items-center gap-3 px-4 py-2 border-r border-slate-200">
                            <Calendar size={16} className="text-[#4D7CFF]" />
                            <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Feb 21, 2026</span>
                            <ChevronDown size={12} className="text-slate-400" />
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Custom</span>
                            <ChevronDown size={12} className="text-slate-400" />
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. TOP STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Blocked IPs / Destinations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#E6EEF8] p-8 rounded-[2.5rem] shadow-[-6px_-6px_12px_rgba(255,255,255,0.8),6px_6px_12px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.1)] transition-all group"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#4D7CFF] shadow-lg">
                            <HardDrive size={22} />
                        </div>
                        <MoreHorizontal className="text-slate-300" size={18} />
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Destinations Listed</p>
                    <h3 className="text-4xl font-black text-slate-800 tracking-tighter">1,253</h3>
                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-[#4D7CFF] text-[10px] font-black">20% of catalog</span>
                        <span className="text-slate-300 text-[10px] font-bold uppercase cursor-pointer hover:text-[#4D7CFF]">View Details</span>
                    </div>
                </motion.div>

                {/* Total Saved / Revenue */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#E6EEF8] p-8 rounded-[2.5rem] shadow-[-6px_-6px_12px_rgba(255,255,255,0.8),6px_6px_12px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.1)] transition-all group"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#4D7CFF] shadow-lg">
                            <Save size={22} />
                        </div>
                        <MoreHorizontal className="text-slate-300" size={18} />
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Revenue</p>
                    <h3 className="text-4xl font-black text-slate-800 tracking-tighter">$9,450</h3>
                    <div className="flex items-center gap-2 mt-4 text-[#4D7CFF] text-[10px] font-black italic">
                        1200 bookings x $0.5 fee
                    </div>
                </motion.div>

                {/* Fraud Score / Customer Stat */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#E6EEF8] p-8 rounded-[2.5rem] shadow-[-6px_-6px_12px_rgba(255,255,255,0.8),6px_6px_12px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.1)] transition-all group"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#4D7CFF] shadow-lg">
                            <Shield size={22} className="opacity-50" />
                        </div>
                        <div className="w-14 h-14 relative flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={150} strokeDashoffset={150 * 0.4} className="text-[#4D7CFF]" />
                            </svg>
                            <span className="absolute text-[10px] font-black text-slate-800">4.6</span>
                        </div>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Safety Score</p>
                    <h3 className="text-4xl font-black text-slate-800 tracking-tighter">4.6</h3>
                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-slate-300 text-[10px] font-bold uppercase">Out of 10</span>
                        <span className="text-slate-300 text-[10px] font-bold uppercase cursor-pointer hover:text-[#4D7CFF] ml-auto">Details</span>
                    </div>
                </motion.div>
            </div>

            {/* 3. MAIN CHART AREA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#E6EEF8] p-10 rounded-[3rem] shadow-[-8px_-8px_16px_rgba(255,255,255,0.8),8px_8px_16px_rgba(0,0,0,0.05)]"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex bg-white/40 p-1 rounded-2xl shadow-inner">
                        {["Visitors", "Bookings", "Direct From Ads"].map((tab, i) => (
                            <button
                                key={tab}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 1 ? "bg-white shadow-lg text-[#4D7CFF]" : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Decorative Line Chart */}
                <div className="relative h-[300px] w-full mt-10">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 300">
                        {/* Vertical Bars Neumorphic */}
                        {[150, 450, 250, 600, 300, 500, 400].map((h, i) => (
                            <rect
                                key={i}
                                x={100 + i * 130}
                                y={300 - (h / 3)}
                                width="40"
                                height={h / 3}
                                rx="12"
                                className="fill-white shadow-inner opacity-60"
                            />
                        ))}

                        {/* Smooth Line */}
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            d="M80,220 Q200,80 350,180 T600,100 T850,200"
                            fill="none"
                            stroke="#4D7CFF"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="drop-shadow-[0_10px_10px_rgba(77,124,255,0.2)]"
                        />

                        {/* Dots */}
                        {[
                            { x: 80, y: 220 }, { x: 230, y: 120 }, { x: 380, y: 160 },
                            { x: 530, y: 140 }, { x: 680, y: 110 }, { x: 830, y: 190 }
                        ].map((dot, i) => (
                            <g key={i}>
                                <circle cx={dot.x} cy={dot.y} r="8" fill="white" className="shadow-lg" />
                                <circle cx={dot.x} cy={dot.y} r="4" fill="#4D7CFF" />
                            </g>
                        ))}
                    </svg>
                    <div className="absolute bottom-[-20px] left-0 w-full flex justify-between px-20 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        <span>Oct 25</span>
                        <span>Oct 26</span>
                        <span>Oct 27</span>
                        <span className="text-[#4D7CFF]">Oct 28</span>
                        <span>Oct 29</span>
                        <span>Oct 30</span>
                        <span>Oct 31</span>
                    </div>
                </div>
            </motion.div>

            {/* 4. BOTTOM ROW STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { label: "Organic Visitors", val: "120", icon: Users },
                    { label: "From Advertising", val: "953", icon: MousePointer2 },
                    { label: "Growth Rate", val: "20.1%", icon: Activity },
                    { label: "Ads Click Rate", val: "87.3%", icon: TrendingUp, primary: true }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className={`p-6 rounded-3xl flex items-center gap-6 ${stat.primary
                                ? "bg-[#4D7CFF] text-white shadow-[0_15px_30px_rgba(77,124,255,0.3)]"
                                : "bg-[#E6EEF8] shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_4px_10px_rgba(0,0,0,0.05)]"
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.primary ? "bg-white/20" : "bg-white text-[#4D7CFF] shadow-md"}`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className={`text-[9px] font-black uppercase tracking-widest leading-none mb-1 ${stat.primary ? "text-white/60" : "text-slate-400"}`}>{stat.label}</p>
                            <p className="text-xl font-black tracking-tight leading-none">{stat.val}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
