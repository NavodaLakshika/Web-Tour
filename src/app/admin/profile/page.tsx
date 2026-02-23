"use client";

import React, { useState, useEffect } from "react";
import {
    User, Mail, Camera, Save, Loader2, Palette,
    Sparkles, Layout, Bell, Shield, MapPin, Globe,
    Twitter, Instagram, Github, CheckCircle2, LayoutDashboard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const colorOptions = [
    { name: "Elephant Gold", value: "#D4AF37" },
    { name: "Sigiriya Green", value: "#1B362D" },
    { name: "Ocean Teal", value: "#008080" },
    { name: "Royal Purple", value: "#6A5ACD" },
    { name: "Sunset Orange", value: "#FF8C00" },
    { name: "Slate Ebony", value: "#1A1A1A" }
];

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [activeTab, setActiveTab] = useState<'identity' | 'appearance' | 'account'>('identity');

    // Profile State
    const [profile, setProfile] = useState({
        full_name: "Admin User",
        email: "",
        role: "Senior Heritage Administrator",
        bio: "Managing the cultural and natural heritage of Sri Lanka through the Tales of Ceylon portal.",
        avatar: "/images/user.jpg",
        accent_color: "#D4AF37",
        location: "Colombo, Sri Lanka",
        website: "www.talesofceylon.com"
    });

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setProfile(prev => ({
                    ...prev,
                    email: user.email || "",
                    full_name: user.user_metadata?.full_name || prev.full_name
                }));
            }
        };
        fetchUser();

        // Load saved theme color
        const savedColor = localStorage.getItem('admin_accent_color');
        if (savedColor) {
            setProfile(prev => ({ ...prev, accent_color: savedColor }));
        }
    }, []);

    const handleSave = async () => {
        setIsLoading(true);

        // Save theme color to local storage
        localStorage.setItem('admin_accent_color', profile.accent_color);

        // Simulate save delay for other fields
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setStatus('success');

        // Trigger a reload or message to update other components if needed
        // For simplicity, we can tell user it's saved. 
        // Real-time update would need a context.
        setTimeout(() => {
            setStatus('idle');
            window.location.reload(); // Refresh to apply theme globally
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Hero Section */}
            <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden shadow-2xl group">
                <Image
                    src="/images/nature.jpg"
                    alt="Cover"
                    fill
                    className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl border-4 border-white overflow-hidden shadow-2xl">
                                <Image src={profile.avatar} alt="Avatar" fill className="object-cover" />
                            </div>
                            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary shadow-lg hover:scale-110 transition-all border-4 border-white">
                                <Camera size={18} />
                            </button>
                        </div>
                        <div className="pb-2">
                            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">{profile.full_name}</h1>
                            <p className="text-[10px] sm:text-xs font-bold text-accent uppercase tracking-[0.2em] mt-1">{profile.role}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-white rounded-2xl border border-primary/5 p-1.5 shadow-sm overflow-x-auto scrollbar-hide">
                {[
                    { id: 'identity', label: 'Identity', icon: User },
                    { id: 'appearance', label: 'Dashboard Theme', icon: Palette },
                    { id: 'account', label: 'Account Security', icon: Shield }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-primary/40 hover:bg-primary/5 hover:text-primary'}`}
                    >
                        <tab.icon size={14} className={activeTab === tab.id ? 'text-accent' : ''} />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Content Area */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-sm overflow-hidden p-10 md:p-14">
                        <AnimatePresence mode="wait">
                            {activeTab === 'identity' && (
                                <motion.div
                                    key="identity"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-10"
                                >
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-heading font-black text-primary uppercase tracking-tight">Identity Profile</h3>
                                        <p className="text-[11px] font-bold text-primary/30 uppercase tracking-widest">Public information and heritage status</p>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3 group">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-2">Display Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={16} />
                                                    <input
                                                        type="text"
                                                        value={profile.full_name}
                                                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-primary outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3 group">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-2">Professional Role</label>
                                                <div className="relative">
                                                    <Sparkles className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={16} />
                                                    <input
                                                        type="text"
                                                        value={profile.role}
                                                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-primary outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-2">Biography</label>
                                            <textarea
                                                value={profile.bio}
                                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                                rows={4}
                                                className="w-full bg-[#FAF9F6] border border-primary/5 rounded-2xl px-6 py-4 text-sm font-bold text-primary outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all resize-none"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3 group">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-2">Station Location</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={16} />
                                                    <input
                                                        type="text"
                                                        value={profile.location}
                                                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-primary outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3 group">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-2">Digital Domain</label>
                                                <div className="relative">
                                                    <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={16} />
                                                    <input
                                                        type="text"
                                                        value={profile.website}
                                                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-primary outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'appearance' && (
                                <motion.div
                                    key="appearance"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-10"
                                >
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-heading font-black text-primary uppercase tracking-tight">Portal Aesthetic</h3>
                                        <p className="text-[11px] font-bold text-primary/30 uppercase tracking-widest">Customize your administrative environment</p>
                                    </div>

                                    <div className="space-y-12">
                                        <div className="space-y-6">
                                            <label className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/40 ml-2">Dashboard Primary Accent</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {colorOptions.map((color) => (
                                                    <button
                                                        key={color.name}
                                                        onClick={() => setProfile({ ...profile, accent_color: color.value })}
                                                        className={`flex flex-col gap-3 p-4 rounded-3xl border transition-all ${profile.accent_color === color.value ? 'bg-primary border-primary shadow-xl shadow-primary/20 scale-105' : 'bg-[#FAF9F6] border-primary/5 hover:border-primary/20'}`}
                                                    >
                                                        <div className="w-full h-12 rounded-xl shadow-inner" style={{ backgroundColor: color.value }} />
                                                        <div className="flex items-center justify-between px-1">
                                                            <span className={`text-[9px] font-black uppercase tracking-widest ${profile.accent_color === color.value ? 'text-white' : 'text-primary'}`}>{color.name}</span>
                                                            {profile.accent_color === color.value && <CheckCircle2 size={12} className="text-accent" />}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-8 bg-accent/5 rounded-[2rem] border border-accent/10 flex items-center justify-between gap-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent">
                                                    <Layout size={32} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[13px] font-black text-primary uppercase tracking-widest">Visual Theme Mode</h4>
                                                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em] mt-1">Light Atmospheric (Default)</p>
                                                </div>
                                            </div>
                                            <button className="px-6 py-3 bg-white border border-primary/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-primary transition-all">Change Mode</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'account' && (
                                <motion.div
                                    key="account"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-10"
                                >
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-heading font-black text-primary uppercase tracking-tight">Security Bridge</h3>
                                        <p className="text-[11px] font-bold text-primary/30 uppercase tracking-widest">Manage authentication and notifications</p>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            { label: "Two-Factor Authentication", desc: "Add an extra layer of security", icon: Shield, active: true },
                                            { label: "Notification Transmissions", desc: "Receive alerts for new inquiries", icon: Bell, active: true },
                                            { label: "Global Activity Log", desc: "Monitor portal login history", icon: LayoutDashboard, active: false }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-primary/5 hover:bg-[#FAF9F6] transition-colors group">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary/30 group-hover:text-accent transition-colors">
                                                        <item.icon size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black text-primary uppercase tracking-wide">{item.label}</p>
                                                        <p className="text-[10px] font-bold text-primary/30 uppercase tracking-widest mt-0.5">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${item.active ? 'bg-accent' : 'bg-primary/10'}`}>
                                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${item.active ? 'translate-x-6' : 'translate-x-0'}`} />
                                                </div>
                                            </div>
                                        ))}

                                        <div className="pt-6">
                                            <button className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                                                <Shield size={14} />
                                                Deactivate My Access
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Save Action */}
                        <div className="mt-12 pt-10 border-t border-primary/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {status === 'success' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-600">
                                        <CheckCircle2 size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Profile Synced Successfully</span>
                                    </motion.div>
                                )}
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="bg-primary hover:bg-[#2A4D3F] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center gap-4 shadow-xl shadow-primary/20 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Socials & Quick Stats */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Social Hub */}
                    <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-sm p-8 space-y-8">
                        <h4 className="text-[11px] font-black text-primary/30 uppercase tracking-[0.3em]">Signature Domains</h4>
                        <div className="space-y-4">
                            {[
                                { name: "X / Twitter", icon: Twitter, value: "@ceylon_heritage" },
                                { name: "Instagram", icon: Instagram, value: "tales.of.ceylon" },
                                { name: "Github", icon: Github, value: "admin_heritage" }
                            ].map((social) => (
                                <div key={social.name} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#FAF9F6] rounded-xl flex items-center justify-center text-primary/20 group-hover:text-accent group-hover:bg-primary transition-all">
                                            <social.icon size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-primary uppercase">{social.name}</p>
                                            <p className="text-[9px] font-bold text-primary/30 uppercase mt-0.5">{social.value}</p>
                                        </div>
                                    </div>
                                    <Save size={12} className="text-primary/10 group-hover:text-accent transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Registry Status */}
                    <div className="bg-primary rounded-[2.5rem] border border-white/10 shadow-2xl p-8 text-white relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                        <h4 className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em] mb-8">Heritage Authority</h4>

                        <div className="space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-accent">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xl font-heading font-black tracking-tight">Level 5</p>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">Admin Security Clearence</p>
                                </div>
                            </div>

                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    className="h-full bg-accent rounded-full"
                                />
                            </div>
                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">85% Verification Strength</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
