"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    MessageSquare, Search, Filter, Mail, User, Clock, CheckCircle,
    Trash2, MoreVertical, Eye, Reply, Archive, AlertCircle, RefreshCw
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMessages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [debugInfo, setDebugInfo] = useState<string>("");

    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        try {
            console.log("AdminMessages: Fetching from contact_messages...");
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("AdminMessages Fetch Error:", error);
                setDebugInfo(`Error: ${error.message}`);
            } else {
                console.log(`AdminMessages: Successfully fetched ${data?.length || 0} messages`);
                setMessages(data || []);
                setDebugInfo(`Successfully loaded ${data?.length || 0} messages`);
            }
        } catch (err: any) {
            console.error("Critical Fetch Error:", err);
            setDebugInfo(`Critical Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMessages();

        // Real-time subscription to auto-update list
        const channel = supabase
            .channel('admin-messages-list')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => {
                console.log("Real-time update detected for messages!");
                fetchMessages();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchMessages]);

    const updateMessageStatus = async (id: number, status: string) => {
        const { error } = await supabase
            .from('contact_messages')
            .update({ status })
            .eq('id', id);

        if (error) {
            alert("Update failed: " + error.message);
        } else {
            fetchMessages();
        }
    };

    const deleteMessage = async (id: number) => {
        if (!confirm("Are you sure you want to delete this transmission?")) return;

        const { error } = await supabase
            .from('contact_messages')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchMessages();
        } else {
            alert("Delete failed: " + error.message);
        }
    };

    const filteredMessages = messages.filter(msg => {
        const matchesSearch =
            (msg.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (msg.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (msg.message?.toLowerCase() || "").includes(searchTerm.toLowerCase());

        // Handle potential case differences in status (ensure comparisons use lowercase)
        const matchesStatus = filterStatus === "all" ||
            (msg.status?.toLowerCase() || "pending") === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 1. Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-heading font-black text-primary tracking-tight uppercase">Inquiry <span className="text-accent underline decoration-primary/10 underline-offset-8">Hub</span></h1>
                    <div className="flex items-center gap-3 mt-3">
                        <div className="bg-primary/5 px-3 py-1.5 rounded-md border border-primary/5 flex items-center gap-2">
                            <MessageSquare size={14} className="text-accent" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Contact Registry</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-md border border-green-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">Live Sync Enabled</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white px-6 py-3 rounded-xl border border-primary/5 flex flex-col items-center justify-center min-w-[120px] shadow-sm">
                        <span className="text-[10px] font-black text-primary/30 uppercase tracking-widest mb-1">New Inquiries</span>
                        <span className="text-xl font-black text-accent">{messages.filter(m => (m.status?.toLowerCase() || 'pending') === 'pending').length}</span>
                    </div>
                </div>
            </div>

            {/* 2. Controls & Diagnostics */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative group max-w-md w-full shadow-sm rounded-xl">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Find transmissions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-primary/5 rounded-xl pl-10 pr-4 py-3.5 text-[11px] font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-accent/20 transition-all w-full"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-[9px] font-black text-primary/30 uppercase tracking-widest">Filter:</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-white border border-primary/5 rounded-xl px-4 py-3.5 text-[11px] font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer hover:border-accent/40 transition-all"
                        >
                            <option value="all">All Channels</option>
                            <option value="pending">Pending Only</option>
                            <option value="read">Archived (Read)</option>
                            <option value="replied">Processed (Replied)</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block px-4 py-2 bg-primary/5 rounded-xl border border-primary/5 text-[9px] font-bold text-primary/40 uppercase tracking-widest">
                        Status: {debugInfo || "Syncing..."}
                    </div>
                    <button
                        onClick={fetchMessages}
                        className="flex items-center gap-2 text-[10px] font-black text-primary/40 hover:text-accent transition-all uppercase tracking-widest group"
                    >
                        <RefreshCw size={14} className={`${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                        <span>Force Refresh</span>
                    </button>
                </div>
            </div>

            {/* Emergency UI: Shows if data exists but is hidden by filters */}
            {messages.length > 0 && filteredMessages.length === 0 && (
                <div className="bg-accent/10 border border-accent/20 p-8 rounded-[32px] animate-in fade-in zoom-in duration-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary shadow-lg shadow-accent/20">
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Hidden Data Alert</h4>
                            <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mt-0.5">
                                Your current filter "{filterStatus}" is hiding {messages.length} messages.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* 3. Messages List */}
            <div className="grid grid-cols-1 gap-6 pb-20">
                {isLoading && messages.length === 0 ? (
                    <div className="py-24 text-center">
                        <div className="w-10 h-10 rounded-full border-4 border-accent border-t-transparent animate-spin mx-auto mb-6" />
                        <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] font-heading">Synchronizing Global Transmissions...</p>
                    </div>
                ) : filteredMessages.length === 0 ? (
                    <div className="py-24 text-center bg-white rounded-[32px] border border-primary/5 shadow-inner">
                        <Archive className="w-12 h-12 text-primary/10 mx-auto mb-6" />
                        <h3 className="text-[13px] font-heading font-black text-primary uppercase tracking-tight mb-2">Registry Silent</h3>
                        <p className="text-[10px] font-bold text-primary/30 uppercase tracking-widest max-w-[200px] mx-auto leading-loose">No inquiries match your current frequency or filters.</p>

                        {/* Status Check if we expected data */}
                        {messages.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-primary/5 max-w-xs mx-auto">
                                <p className="text-[9px] font-black text-primary/20 uppercase tracking-widest mb-3">Filter Diagnostics:</p>
                                <div className="flex justify-center gap-2">
                                    <span className="px-2 py-1 bg-primary/5 rounded text-[9px] font-bold">Total: {messages.length}</span>
                                    <span className="px-2 py-1 bg-primary/5 rounded text-[9px] font-bold">Search: "{searchTerm || 'None'}"</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    filteredMessages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`bg-white rounded-[32px] border transition-all duration-500 overflow-hidden group ${msg.status?.toLowerCase() === 'pending' ? 'border-accent shadow-xl shadow-accent/5' : 'border-primary/5 hover:border-primary/20 hover:shadow-2xl'}`}
                        >
                            <div className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    <div className="flex items-start gap-6">
                                        <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 ${msg.status?.toLowerCase() === 'pending' ? 'bg-accent text-primary shadow-lg shadow-accent/20' : 'bg-primary/5 text-primary/20'}`}>
                                            <Mail size={24} strokeWidth={2.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-4">
                                                <h4 className="text-[18px] font-heading font-black text-primary uppercase tracking-tight">{msg.full_name}</h4>
                                                {msg.status?.toLowerCase() === 'pending' && <span className="px-3 py-1 bg-accent text-primary text-[8px] font-black rounded-full uppercase tracking-widest">New Priority</span>}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4">
                                                <p className="text-[11px] font-bold text-primary/40 uppercase tracking-widest flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/5 hover:border-accent/40 transition-colors">
                                                    <User size={12} className="text-accent" />
                                                    {msg.email}
                                                </p>
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-lg border border-primary/5">
                                                    <Clock size={12} className="text-accent" />
                                                    <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{new Date(msg.created_at).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`px-5 py-2.5 rounded-2xl border font-black text-[10px] uppercase tracking-[0.2em] shadow-sm ${msg.status?.toLowerCase() === 'pending' ? 'bg-orange-50 border-orange-200 text-orange-600 animate-pulse' :
                                        msg.status?.toLowerCase() === 'read' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                                            'bg-green-50 border-green-200 text-green-600'
                                        }`}>
                                        {msg.status || 'pending'}
                                    </div>
                                </div>

                                <div className="mt-10 p-8 bg-[#FAF9F6] rounded-[28px] border border-primary/5 relative group-hover:bg-white transition-all duration-500">
                                    <AlertCircle className="absolute -top-3 -left-3 text-accent w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <p className="text-[15px] font-art leading-relaxed text-primary/70 italic first-letter:text-3xl first-letter:font-heading first-letter:mr-2">"{msg.message}"</p>
                                </div>

                                <div className="mt-10 pt-8 border-t border-primary/5 flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => updateMessageStatus(msg.id, 'read')}
                                            className="flex items-center gap-3 px-6 py-3.5 bg-white border border-primary/10 rounded-2xl text-primary/60 text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                                        >
                                            <Eye size={16} />
                                            <span>Mark as Read</span>
                                        </button>
                                        <button
                                            onClick={() => updateMessageStatus(msg.id, 'replied')}
                                            className="flex items-center gap-3 px-6 py-3.5 bg-white border border-primary/10 rounded-2xl text-primary/60 text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-primary hover:border-accent transition-all shadow-sm"
                                        >
                                            <Reply size={16} />
                                            <span>Mark Replied</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => deleteMessage(msg.id)}
                                        className="p-4 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                                        title="Delete Transmission"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
