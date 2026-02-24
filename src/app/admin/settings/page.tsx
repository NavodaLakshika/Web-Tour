"use client";

import React, { useState, useEffect } from "react";
import {
    Settings, Shield, UserPlus, Key, Mail,
    Save, Loader2, CheckCircle2, AlertTriangle,
    User, HardDrive, ShieldAlert, History
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [activeTab, setActiveTab] = useState<'account' | 'users'>('account');
    const [errorMessage, setErrorMessage] = useState("");

    // Account Settings State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // New User State
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) setEmail(user.email);
        };
        getUser();
    }, []);

    const handleUpdateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setStatus('error');
            return;
        }

        setIsLoading(true);
        setStatus('loading');
        setErrorMessage("");

        try {
            const updates: any = {};
            if (email) updates.email = email;
            if (password) updates.password = password;

            const { error } = await supabase.auth.updateUser(updates);
            if (error) throw error;

            setStatus('success');
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error: any) {
            setErrorMessage(error.message);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('loading');

        try {
            const { error } = await supabase.auth.signUp({
                email: newUserEmail,
                password: newUserPassword,
                options: {
                    emailRedirectTo: `${window.location.origin}/login`,
                }
            });

            if (error) throw error;

            setStatus('success');
            setNewUserEmail("");
            setNewUserPassword("");
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error: any) {
            setErrorMessage(error.message);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight uppercase">Portal <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">Settings</span></h1>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="bg-primary/5 px-3 py-1.5 rounded-[8px] border border-primary/5 flex items-center gap-2">
                            <Settings size={14} className="text-accent" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">System Governance</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-3 space-y-2">
                    <button
                        onClick={() => setActiveTab('account')}
                        className={`w-full flex items-center gap-3 px-6 py-4 rounded-[8px] text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'account' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white text-primary/40 hover:bg-primary/5 hover:text-primary border border-primary/5'}`}
                    >
                        <Shield size={18} className={activeTab === 'account' ? 'text-accent' : ''} />
                        <span>Security & Identity</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center gap-3 px-6 py-4 rounded-[8px] text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white text-primary/40 hover:bg-primary/5 hover:text-primary border border-primary/5'}`}
                    >
                        <UserPlus size={18} className={activeTab === 'users' ? 'text-accent' : ''} />
                        <span>Manager Registry</span>
                    </button>

                    <div className="mt-10 p-6 bg-accent/5 border border-accent/10 rounded-[8px] space-y-4">
                        <div className="flex items-center gap-2 text-accent">
                            <ShieldAlert size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Security Advisory</span>
                        </div>
                        <p className="text-xs font-medium text-primary/60 leading-relaxed uppercase tracking-wider">
                            Changes to administrator credentials require immediate re-authentication.
                        </p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9">
                    <div className="bg-white rounded-[8px] border border-primary/5 shadow-sm overflow-hidden min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'account' ? (
                                <motion.div
                                    key="account"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="p-10 md:p-14"
                                >
                                    <div className="space-y-8 max-w-2xl">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-primary uppercase tracking-tight">Access Credentials</h3>
                                            <p className="text-xs font-bold text-primary/30 uppercase tracking-widest leading-loose">Update your primary administrative identification</p>
                                        </div>

                                        <form onSubmit={handleUpdateAccount} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3 group">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-2 group-focus-within:text-accent transition-colors">Master Email</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={16} />
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] pl-14 pr-6 py-4 text-sm font-bold text-primary outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                                <div className="space-y-3 group">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-2 group-focus-within:text-accent transition-colors">New Access Key</label>
                                                    <div className="relative">
                                                        <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={16} />
                                                        <input
                                                            type="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder="Leave blank to keep current"
                                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] pl-14 pr-6 py-4 text-sm font-bold text-primary outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all placeholder:text-primary/10"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-3 group">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-2 group-focus-within:text-accent transition-colors">Confirm Key</label>
                                                    <div className="relative">
                                                        <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={16} />
                                                        <input
                                                            type="password"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] pl-14 pr-6 py-4 text-sm font-bold text-primary outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-primary/5 flex items-center justify-between gap-6">
                                                <div className="flex-1">
                                                    <AnimatePresence mode="wait">
                                                        {status === 'success' && (
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-600">
                                                                <CheckCircle2 size={14} />
                                                                <span className="text-[9px] font-black uppercase tracking-widest">Account Updated Successfully</span>
                                                            </motion.div>
                                                        )}
                                                        {status === 'error' && (
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-500">
                                                                <AlertTriangle size={14} />
                                                                <span className="text-[9px] font-black uppercase tracking-widest">{errorMessage}</span>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="bg-primary hover:bg-[#2A4D3F] text-white px-10 py-4 rounded-[8px] font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-3 disabled:opacity-50"
                                                >
                                                    {isLoading ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                                                    <span>Commit Changes</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="users"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="p-10 md:p-14"
                                >
                                    <div className="space-y-10">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-primary uppercase tracking-tight">Provision New Access</h3>
                                            <p className="text-xs font-bold text-primary/30 uppercase tracking-widest leading-loose">Invite additional Heritage Managers to the governance portal</p>
                                        </div>

                                        <form onSubmit={handleAddUser} className="p-8 bg-[#FAF9F6] rounded-[8px] border border-primary/5 space-y-8 max-w-2xl">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3 group">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-2">Manager Email</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={16} />
                                                        <input
                                                            required
                                                            type="email"
                                                            value={newUserEmail}
                                                            onChange={(e) => setNewUserEmail(e.target.value)}
                                                            className="w-full bg-white border border-primary/5 rounded-[8px] pl-14 pr-6 py-4 text-sm font-bold text-primary outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-3 group">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-2">Access Key</label>
                                                    <div className="relative">
                                                        <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={16} />
                                                        <input
                                                            required
                                                            type="password"
                                                            value={newUserPassword}
                                                            onChange={(e) => setNewUserPassword(e.target.value)}
                                                            className="w-full bg-white border border-primary/5 rounded-[8px] pl-14 pr-6 py-4 text-sm font-bold text-primary outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-accent hover:bg-black text-primary hover:text-white py-5 rounded-[8px] font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/10"
                                            >
                                                {isLoading ? <Loader2 className="animate-spin" size={14} /> : <UserPlus size={14} />}
                                                <span>Invite Manager</span>
                                            </button>
                                        </form>

                                        <div className="space-y-6 pt-10">
                                            <div className="flex items-center gap-4">
                                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary/40">Active Sessions</h4>
                                                <div className="h-[1px] flex-1 bg-primary/5" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="p-6 rounded-[8px] border border-primary/5 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-primary/5 rounded-[8px] flex items-center justify-center text-primary/30">
                                                            <User size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-primary uppercase">{email}</p>
                                                            <p className="text-[9px] font-bold text-accent uppercase tracking-widest mt-0.5">Primary Administrator</p>
                                                        </div>
                                                    </div>
                                                    <div className="px-3 py-1 bg-green-50 text-green-700 text-[8px] font-black rounded-full uppercase tracking-widest">Active Now</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
