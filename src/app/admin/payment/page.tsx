"use client";

import React, { useState } from "react";
import {
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    Download,
    Filter,
    Calendar,
    Search,
    ChevronRight,
    Wallet,
    BarChart3,
    PieChart,
    RefreshCcw,
    CheckCircle2,
    Clock,
    AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

const transactions = [
    { id: "TRX-9821", date: "2024-02-24", guest: "Jonathan Aris", service: "Sigiriya Heritage Tour", amount: 450.00, status: "completed", method: "Visa •••• 4242" },
    { id: "TRX-9820", date: "2024-02-23", guest: "Elena Gilbert", service: "Ella Odyssey Rails", amount: 125.50, status: "completed", method: "Mastercard •••• 5555" },
    { id: "TRX-9819", date: "2024-02-23", guest: "Marcus Vane", service: "Galle Fort Walk", amount: 85.00, status: "pending", method: "PayPal" },
    { id: "TRX-9818", date: "2024-02-22", guest: "Sarah Chen", service: "Luxury Coast Stay", amount: 1200.00, status: "completed", method: "Visa •••• 9012" },
    { id: "TRX-9817", date: "2024-02-21", guest: "David Miller", service: "Anuradhapura Visit", amount: 210.00, status: "refunded", method: "Apple Pay" },
    { id: "TRX-9816", date: "2024-02-20", guest: "Sophie Turner", service: "Yala Safari Series", amount: 350.00, status: "completed", method: "Mastercard •••• 1111" },
];

export default function RevenuePage() {
    const [timeRange, setTimeRange] = useState("Last 30 Days");

    const stats = [
        { name: "Total Revenue", value: "$42,850.00", change: "+12.5%", trendingUp: true, icon: DollarSign },
        { name: "Average Booking", value: "$324.50", change: "+4.2%", trendingUp: true, icon: BarChart3 },
        { name: "Net Profit", value: "$31,200.00", change: "+8.1%", trendingUp: true, icon: TrendingUp },
        { name: "Refund Rate", value: "1.2%", change: "-0.5%", trendingUp: false, icon: RefreshCcw },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight uppercase">Revenue <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">Ledger</span></h1>
                    <p className="text-primary/40 text-xs font-bold uppercase tracking-[0.2em] mt-4">Heritage Financial Records • Global Operations</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-primary/5 rounded-xl text-primary/60 text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-sm">
                        <Download size={16} />
                        <span>Export CSV</span>
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-lg shadow-primary/20">
                        <Wallet size={16} className="text-accent" />
                        <span>Payout Now</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/5 rounded-xl text-accent group-hover:bg-primary group-hover:text-accent transition-all duration-500">
                                <stat.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider ${stat.trendingUp ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.trendingUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-xs font-bold text-primary/30 uppercase tracking-widest mb-1">{stat.name}</p>
                        <h3 className="text-2xl font-bold text-primary tracking-tighter">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Trends Chart Placeholder */}
            <div className="bg-white p-8 rounded-2xl border border-primary/5 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 -mr-32 -mt-32 rounded-full blur-3xl" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                    <div>
                        <h3 className="text-lg font-bold text-primary uppercase tracking-tight">Revenue Trajectory</h3>
                        <p className="text-[10px] font-bold text-primary/20 uppercase tracking-[0.2em] mt-1">Growth progression over time</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#FAF9F6] p-1 rounded-xl border border-primary/5">
                        {["Day", "Week", "Month", "Year"].map((range) => (
                            <button
                                key={range}
                                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${range === "Month" ? 'bg-primary text-white shadow-lg' : 'text-primary/30 hover:text-primary'}`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Simulated Chart */}
                <div className="h-[300px] flex items-end gap-2 md:gap-4 relative z-10 px-4">
                    {[45, 60, 55, 80, 70, 90, 85, 95, 110, 100, 120, 115].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${val}%` }}
                                transition={{ delay: i * 0.05, duration: 1 }}
                                className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 relative cursor-pointer ${i === 10 ? 'bg-accent' : 'bg-primary/10 group-hover/bar:bg-primary'}`}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-primary text-white text-[9px] font-black py-1 px-2 rounded-md transition-transform group-hover/bar:-translate-y-1">
                                    ${(val * 125).toLocaleString()}
                                </div>
                            </motion.div>
                            <span className="text-[9px] font-bold text-primary/20 uppercase tracking-widest">
                                {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-primary uppercase tracking-tight">Recent Transmissions</h3>
                        <p className="text-[10px] font-bold text-primary/20 uppercase tracking-[0.2em] mt-1">Financial history ledger</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20" size={14} />
                            <input
                                type="text"
                                placeholder="Search Ledger..."
                                className="bg-white border border-primary/5 rounded-xl pl-9 pr-4 py-2 text-xs font-bold outline-none shadow-sm focus:border-accent transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FAF9F6] border-b border-primary/5">
                                <th className="px-6 py-5 text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Transaction ID</th>
                                <th className="px-6 py-5 text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Guest / Payload</th>
                                <th className="px-6 py-5 text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Heritage Service</th>
                                <th className="px-6 py-5 text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Amount</th>
                                <th className="px-6 py-5 text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {transactions.map((trx, i) => (
                                <motion.tr
                                    key={trx.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + (i * 0.05) }}
                                    className="group hover:bg-primary/[0.01] transition-colors"
                                >
                                    <td className="px-6 py-6 text-xs font-bold text-primary tracking-tight">{trx.id}</td>
                                    <td className="px-6 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-primary">{trx.guest}</span>
                                            <span className="text-[9px] font-bold text-primary/30 uppercase tracking-widest mt-1">{trx.method}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-xs font-bold text-primary/60">{trx.service}</td>
                                    <td className="px-6 py-6 text-xs font-bold text-primary">${trx.amount.toFixed(2)}</td>
                                    <td className="px-6 py-6">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${trx.status === 'completed' ? 'bg-green-50 border-green-200 text-green-600' :
                                                trx.status === 'pending' ? 'bg-orange-50 border-orange-200 text-orange-600' :
                                                    'bg-red-50 border-red-200 text-red-600'
                                            }`}>
                                            {trx.status === 'completed' ? <CheckCircle2 size={10} /> : trx.status === 'pending' ? <Clock size={10} /> : <AlertCircle size={10} />}
                                            {trx.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <button className="p-2 text-primary/20 hover:text-accent transition-all">
                                            <ChevronRight size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <p className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Showing 6 of 142 transmissions</p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 border border-primary/5 rounded-lg text-primary/20 hover:text-primary transition-all shadow-sm bg-white cursor-not-allowed"><ChevronRight className="rotate-180" size={16} /></button>
                        <button className="px-4 py-2 border border-primary/5 rounded-lg text-xs font-bold bg-primary text-white shadow-lg shadow-primary/20">1</button>
                        <button className="px-4 py-2 border border-primary/5 rounded-lg text-xs font-bold text-primary/40 hover:bg-primary/5 transition-all bg-white">2</button>
                        <button className="p-2 border border-primary/5 rounded-lg text-primary/20 hover:text-primary transition-all shadow-sm bg-white"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
