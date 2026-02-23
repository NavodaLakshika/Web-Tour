"use client";

import React, { useState, useEffect } from "react";
import {
    Clock,
    User,
    Mail,
    Calendar,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Search,
    Filter,
    ArrowUpRight,
    MapPin,
    Eye
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminRequests() {
    const [requests, setRequests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('trip_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setRequests(data);
        }
        setIsLoading(false);
    };

    const updateStatus = async (id: number, status: string) => {
        const { error } = await supabase
            .from('trip_requests')
            .update({ status })
            .eq('id', id);

        if (!error) {
            fetchRequests();
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this guest request?")) return;

        try {
            const { error } = await supabase
                .from('trip_requests')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchRequests();
        } catch (error: any) {
            alert("Error deleting request: " + error.message);
        }
    };

    const filteredRequests = requests.filter(req =>
        req.focus?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-primary tracking-tight uppercase">Guest <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">Requests</span></h1>
                <div className="flex items-center gap-4 mt-4">
                    <div className="bg-primary/5 px-3 py-1.5 rounded-[2px] border border-primary/5 flex items-center gap-2">
                        <Clock size={14} className="text-accent" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Live Inquiries</span>
                    </div>
                    <p className="text-primary/40 font-bold text-xs uppercase tracking-wider">Global Service Response</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Inquiries", val: requests.filter(r => r.status === 'pending').length, color: "text-accent" },
                    { label: "In Review", val: requests.filter(r => r.status === 'reviewing').length, color: "text-blue-500" },
                    { label: "Responded", val: requests.filter(r => r.status === 'responded').length, color: "text-green-500" },
                    { label: "Total Volume", val: requests.length, color: "text-primary/40" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2px] border border-primary/5 shadow-sm">
                        <p className="text-[10px] font-bold text-primary/30 uppercase tracking-widest mb-2">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.val}</p>
                    </div>
                ))}
            </div>

            {/* List */}
            <div className="bg-white rounded-[2px] border border-primary/5 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative group flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20" size={16} />
                        <input
                            type="text"
                            placeholder="FIND REQUESTS..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] pl-10 pr-4 py-3.5 text-xs font-bold uppercase tracking-wider outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FAF9F6]">
                                <th className="p-6 text-[10px] font-bold text-primary/30 uppercase tracking-widest">Details</th>
                                <th className="p-6 text-[10px] font-bold text-primary/30 uppercase tracking-widest">Accommodation</th>
                                <th className="p-6 text-[10px] font-bold text-primary/30 uppercase tracking-widest">Date</th>
                                <th className="p-6 text-[10px] font-bold text-primary/30 uppercase tracking-widest">Status</th>
                                <th className="p-6 text-[10px] font-bold text-primary/30 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {filteredRequests.map((req, i) => (
                                <tr key={i} className="hover:bg-primary/[0.01] transition-colors group">
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[13px] font-black text-primary uppercase tracking-tight">{req.focus} Journey</span>
                                            <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">{req.duration} Expedition</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-wrap gap-2">
                                            {req.accommodation?.map((acc: string, idx: number) => (
                                                <span key={idx} className="px-2 py-1 bg-primary/5 rounded-md text-[9px] font-black text-primary/60 uppercase">{acc}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="text-[11px] font-bold text-primary/60 uppercase tracking-widest">{new Date(req.created_at).toLocaleDateString()}</span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${req.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                                            req.status === 'reviewing' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button onClick={() => updateStatus(req.id, 'reviewing')} className="p-2 text-primary/20 hover:text-blue-500 transition-colors" title="Mark Reviewing">
                                                <Eye size={18} />
                                            </button>
                                            <button onClick={() => updateStatus(req.id, 'responded')} className="p-2 text-primary/20 hover:text-green-500 transition-colors" title="Mark Responded">
                                                <CheckCircle2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(req.id)} className="p-2 text-primary/20 hover:text-red-500 transition-colors" title="Delete Permanent">
                                                <XCircle size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
