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

            // First, verify connection state
            const { data: { session } } = await supabase.auth.getSession();
            console.log("Current session status:", session ? "Authenticated" : "Anonymous");

            const { data, error, status, statusText } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("AdminMessages Fetch Error:", error);
                setDebugInfo(`Error ${status}: ${error.message} (${statusText})`);
            } else {
                console.log(`AdminMessages: Received ${data?.length || 0} rows from DB`);
                setMessages(data || []);
                setDebugInfo(`Successfully loaded ${data?.length || 0} messages. Status: ${status} (${statusText})`);
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

        console.log("AdminMessages: Setting up real-time subscription...");
        // Real-time subscription to auto-update list
        const channel = supabase
            .channel('admin-messages-list-realtime')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'contact_messages'
            }, (payload) => {
                console.log("⚡ Real-time update detected!", payload);
                fetchMessages();
                // Play a subtle sound or trigger a browser notification if possible
                if (typeof window !== 'undefined' && 'Notification' in window) {
                    if (Notification.permission === 'granted') {
                        new Notification('New Inquiry Received!', { body: 'A guest has sent a new message.' });
                    }
                }
            })
            .subscribe((status) => {
                console.log("Real-time subscription status:", status);
                if (status === 'SUBSCRIBED') {
                    setDebugInfo(prev => `${prev} | Live Sync: Active`);
                } else if (status === 'CHANNEL_ERROR') {
                    setDebugInfo(prev => `${prev} | Live Sync: Error (Check Realtime settings)`);
                }
            });

        // Request notification permission
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        return () => {
            console.log("AdminMessages: Cleaning up real-time...");
            supabase.removeChannel(channel);
        };
    }, [fetchMessages]);

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', deleteId);

            if (error) throw error;

            // Success: state will be updated by real-time chanels, but we can do it manually for speed
            setMessages(prev => prev.filter(m => m.id !== deleteId));
            setDeleteId(null);
        } catch (err: any) {
            alert("Deletion failed: " + err.message);
        } finally {
            setIsDeleting(false);
        }
    };

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

    const filteredMessages = messages.filter(msg => {
        const matchesSearch =
            (msg.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (msg.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (msg.message?.toLowerCase() || "").includes(searchTerm.toLowerCase());

        // Handle potential case differences in status
        const matchesStatus = filterStatus === "all" ||
            (msg.status?.toLowerCase() || "pending") === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 1. Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight uppercase">Inquiry <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">Hub</span></h1>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="bg-primary/5 px-3 py-1.5 rounded-[2px] border border-primary/5 flex items-center gap-2">
                            <MessageSquare size={14} className="text-accent" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Contact Registry</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-[2px] border border-green-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">Live Sync Enabled</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white px-6 py-3 rounded-[2px] border border-primary/5 flex flex-col items-center justify-center min-w-[120px] shadow-sm">
                        <span className="text-xs font-bold text-primary/30 uppercase tracking-wider mb-1">New Inquiries</span>
                        <span className="text-xl font-bold text-accent">{messages.filter(m => (m.status?.toLowerCase() || 'pending') === 'pending').length}</span>
                    </div>
                </div>
            </div>

            {/* 2. Controls & Diagnostics */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative group max-w-md w-full shadow-sm rounded-[2px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Find transmissions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-primary/5 rounded-[2px] pl-10 pr-4 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20 transition-all w-full"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-semibold text-primary/30 uppercase tracking-wider">Filter:</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-white border border-primary/5 rounded-[2px] px-4 py-3.5 text-sm font-semibold outline-none shadow-sm cursor-pointer hover:border-accent/40 transition-all"
                        >
                            <option value="all">All Channels</option>
                            <option value="pending">Pending Only</option>
                            <option value="read">Archived (Read)</option>
                            <option value="replied">Processed (Replied)</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block px-4 py-2 bg-primary/5 rounded-[2px] border border-primary/5 text-xs font-bold text-primary/40 uppercase tracking-wider">
                        Status: {debugInfo || "Syncing..."}
                    </div>
                    <button
                        onClick={fetchMessages}
                        className="flex items-center gap-2 text-xs font-bold text-primary/40 hover:text-accent transition-all uppercase tracking-wider group"
                    >
                        <RefreshCw size={14} className={`${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                        <span>Force Refresh</span>
                    </button>
                </div>
            </div>

            {/* 3. Messages List */}
            <div className="grid grid-cols-1 gap-6 pb-20">
                {isLoading && messages.length === 0 ? (
                    <div className="py-24 text-center">
                        <div className="w-10 h-10 rounded-full border-4 border-accent border-t-transparent animate-spin mx-auto mb-6" />
                        <p className="text-xs font-bold text-primary/30 uppercase tracking-wider">Synchronizing Global Transmissions...</p>
                    </div>
                ) : filteredMessages.length === 0 ? (
                    <div className="py-24 text-center bg-white rounded-[2px] border border-primary/5 shadow-inner">
                        <Archive className="w-12 h-12 text-primary/10 mx-auto mb-6" />
                        <h3 className="text-[13px] font-bold text-primary uppercase tracking-tight mb-2">Registry Silent</h3>
                        <p className="text-xs font-medium text-primary/30 uppercase tracking-wider max-w-[200px] mx-auto leading-loose">No inquiries match your current frequency or filters.</p>
                    </div>
                ) : (
                    filteredMessages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`bg-white rounded-[1px] border transition-all duration-500 overflow-hidden group ${msg.status?.toLowerCase() === 'pending' ? 'border-accent shadow-lg shadow-accent/5' : 'border-primary/5 hover:border-primary/20 hover:shadow-xl'}`}
                        >
                            <div className="p-5 md:p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-[1px] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105 ${msg.status?.toLowerCase() === 'pending' ? 'bg-accent text-primary shadow-md shadow-accent/20' : 'bg-primary/5 text-primary/20'}`}>
                                            <Mail size={18} strokeWidth={2.5} />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-[15px] font-bold text-primary uppercase tracking-tight">{msg.full_name}</h4>
                                                {msg.status?.toLowerCase() === 'pending' && <span className="px-2 py-0.5 bg-accent text-primary text-[7px] font-bold rounded-full uppercase tracking-widest">Priority</span>}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <p className="text-[10px] font-semibold text-primary/60 flex items-center gap-1.5 bg-primary/5 px-2 py-1 rounded-[1px] border border-primary/5">
                                                    <User size={10} className="text-accent" />
                                                    {msg.email}
                                                </p>
                                                <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/5 rounded-[1px] border border-primary/5">
                                                    <Clock size={10} className="text-accent" />
                                                    <span className="text-[10px] font-medium text-primary/40">{new Date(msg.created_at).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`px-4 py-1.5 rounded-[1px] border font-bold text-[9px] uppercase tracking-wider shadow-sm ${msg.status?.toLowerCase() === 'pending' ? 'bg-orange-50 border-orange-200 text-orange-600' :
                                        msg.status?.toLowerCase() === 'read' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                                            'bg-green-50 border-green-200 text-green-600'
                                        }`}>
                                        {msg.status || 'pending'}
                                    </div>
                                </div>

                                <div className="mt-6 p-5 bg-[#FAF9F6] rounded-[1px] border border-primary/5 relative group-hover:bg-white transition-all duration-500">
                                    <p className="text-sm leading-relaxed text-primary/70">{msg.message}</p>
                                </div>

                                <div className="mt-6 pt-5 border-t border-primary/5 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => updateMessageStatus(msg.id, 'read')}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-primary/10 rounded-[1px] text-primary/70 text-[9px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                                        >
                                            <Eye size={14} />
                                            <span>Mark as Read</span>
                                        </button>
                                        <button
                                            onClick={() => updateMessageStatus(msg.id, 'replied')}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-primary/10 rounded-[1px] text-primary/70 text-[9px] font-bold uppercase tracking-wider hover:bg-accent hover:text-primary hover:border-accent transition-all shadow-sm"
                                        >
                                            <Reply size={14} />
                                            <span>Mark Replied</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setDeleteId(msg.id)}
                                        className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-[1px] transition-all border border-transparent hover:border-red-100"
                                        title="Delete Transmission"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
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
                            <div className="p-12 text-center space-y-8">
                                <div className="relative mx-auto w-24 h-24">
                                    <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping" />
                                    <div className="relative w-full h-full bg-red-50 rounded-full flex items-center justify-center text-red-500 shadow-xl shadow-red-500/10">
                                        <Trash2 size={48} strokeWidth={1.5} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-3xl font-bold text-primary uppercase tracking-tight">Erase Submission</h3>
                                    <p className="text-[11px] font-bold text-primary/40 uppercase tracking-widest leading-loose max-w-sm mx-auto">
                                        You are about to permanently purge this transmission from the heritage registry.
                                        <br /><span className="text-red-500/60 text-[9px]">CAUTION: This cryptographic action is permanent.</span>
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setDeleteId(null)}
                                        className="flex-1 px-8 py-5 border border-primary/5 rounded-[2px] text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-all"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="flex-1 px-8 py-5 bg-red-600 text-white rounded-[2px] text-[10px] font-bold uppercase tracking-widest shadow-2xl shadow-red-600/30 hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isDeleting ? <RefreshCw className="animate-spin" size={16} /> : <Trash2 size={16} />}
                                        <span>{isDeleting ? "Purging..." : "Confirm Purge"}</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
