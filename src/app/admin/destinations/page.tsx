"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    MapPin,
    Star,
    ArrowRight
} from "lucide-react";
import { destinations } from "@/lib/data";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDestinations() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredDestinations = destinations.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-heading font-black text-black uppercase tracking-tight">Manage Destinations</h1>
                    <p className="text-gray-500 font-art text-lg mt-1">Add, edit, or remove your signature locations.</p>
                </div>
                <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:bg-secondary hover:text-black transition-all shadow-xl shadow-black/10 group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Add New Destination</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-[2rem] border border-black/[0.03] shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search destinations by name or district..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#F8F9FA] border-none rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-50 text-black border border-black/[0.05] rounded-xl hover:bg-gray-100 transition-all text-[10px] font-black uppercase tracking-widest">
                        <Filter size={16} />
                        Filter
                    </button>
                    <select className="flex-1 md:flex-none px-6 py-3.5 bg-gray-50 text-black border border-black/[0.05] rounded-xl hover:bg-gray-100 transition-all text-[10px] font-black uppercase tracking-widest outline-none">
                        <option>Region: All</option>
                        <option>Central</option>
                        <option>South</option>
                        <option>West</option>
                    </select>
                </div>
            </div>

            {/* Destinations Table */}
            <div className="bg-white rounded-[2.5rem] border border-black/[0.03] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead>
                            <tr className="bg-[#F8F9FA]">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Region</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Interest</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/[0.03]">
                            {filteredDestinations.map((dest, i) => (
                                <motion.tr
                                    key={dest.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-gray-50 transition-colors group"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-md">
                                                <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-black uppercase tracking-tight">{dest.name}</p>
                                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                                    <MapPin size={10} />
                                                    {dest.location}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-black text-black uppercase tracking-widest px-3 py-1.5 bg-gray-100 rounded-full">
                                            {dest.region}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest px-3 py-1.5 bg-secondary/5 rounded-full">
                                            {dest.interest}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-1.5">
                                            <Star size={14} className="fill-secondary text-secondary" />
                                            <span className="text-sm font-black text-black">{dest.rating}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Published</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-2.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="h-6 w-[1px] bg-gray-200 mx-1" />
                                            <button className="p-2.5 text-secondary hover:bg-secondary/10 rounded-xl transition-all">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-[#F8F9FA] border-t border-black/[0.03] flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                        Showing {filteredDestinations.length} out of {destinations.length} destinations
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-black/[0.05] bg-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-gray-50 transition-all opacity-50 cursor-not-allowed">Previous</button>
                        <button className="px-4 py-2 border border-black/[0.05] bg-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-gray-50 transition-all">Next Page</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
