"use client";

import React, { useState, useEffect } from "react";
import {
    Users, UserPlus, Search, Filter, Mail, Phone, Shield,
    BadgeCheck, MoreVertical, MapPin, Star, ArrowUpRight,
    Trash2, Plus, X, Check
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const staticManagers = [
    {
        id: "static-1",
        name: "Amara Jayewardene",
        role: "Chief Heritage Officer",
        level: "Senior Level",
        email: "amara.j@talesofceylon.com",
        phone: "+94 77 123 4567",
        location: "Kandy Regional Office",
        status: "Active",
        rating: "4.9",
        sites: "12",
        image: "/images/user.jpg"
    },
    {
        id: "static-2",
        name: "Kasun Perera",
        role: "Site Operations Manager",
        level: "Mid Level",
        email: "kasun.p@talesofceylon.com",
        phone: "+94 71 987 6543",
        location: "Galle Fort Division",
        status: "Active",
        rating: "4.7",
        sites: "8",
        image: "/images/user.jpg"
    },
    {
        id: "static-3",
        name: "Dilini Silva",
        role: "Cultural Preservationist",
        level: "Expert",
        email: "dilini.s@talesofceylon.com",
        phone: "+94 76 555 1212",
        location: "Anuradhapura Desk",
        status: "On Leave",
        rating: "5.0",
        sites: "15",
        image: "/images/user.jpg"
    },
    {
        id: "static-4",
        name: "Nuwan Abeykoon",
        role: "Regional Coordinator",
        level: "Senior Level",
        email: "nuwan.a@talesofceylon.com",
        phone: "+94 70 333 4444",
        location: "Central Highlands",
        status: "Active",
        rating: "4.5",
        sites: "6",
        image: "/images/user.jpg"
    }
];
export default function HeritageManagers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dbManagers, setDbManagers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "Regional Coordinator",
        level: "Mid Level",
        email: "",
        phone: "",
        location: "",
        status: "Active",
        rating: "4.5",
        sites: "0",
        image: "/images/user.jpg"
    });

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('team')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) setDbManagers(data);
        } catch (e) {
            console.error("Team fetch error (Table might not exist yet)");
        }
        setIsLoading(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `team/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let imageUrl = formData.image;
            if (imageFile) imageUrl = await uploadImage(imageFile);

            const submissionData = { ...formData, image: imageUrl };

            let error;
            if (editingId) {
                const { error: updateError } = await supabase.from('team').update(submissionData).eq('id', editingId);
                error = updateError;
            } else {
                const { error: insertError } = await supabase.from('team').insert([submissionData]);
                error = insertError;
            }

            if (error) throw error;
            setIsModalOpen(false);
            resetForm();
            fetchManagers();
        } catch (error: any) {
            alert("Error saving manager: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Permanent removal of this manager?")) return;
        try {
            const { error } = await supabase.from('team').delete().eq('id', id);
            if (error) throw error;
            fetchManagers();
        } catch (error: any) {
            alert("Error deleting entry: " + error.message);
        }
    };

    const handleEdit = (m: any) => {
        setEditingId(m.id);
        setFormData({
            name: m.name,
            role: m.role,
            level: m.level,
            email: m.email,
            phone: m.phone,
            location: m.location,
            status: m.status,
            rating: m.rating.toString(),
            sites: m.sites.toString(),
            image: m.image
        });
        setImagePreview(m.image);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            name: "",
            role: "Regional Coordinator",
            level: "Mid Level",
            email: "",
            phone: "",
            location: "",
            status: "Active",
            rating: "4.5",
            sites: "0",
            image: "/images/user.jpg"
        });
        setImageFile(null);
        setImagePreview(null);
        setEditingId(null);
    };

    const displayManagers = dbManagers.length > 0 ? dbManagers : staticManagers;

    const filteredManagers = displayManagers.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight uppercase">Heritage <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">Managers</span></h1>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="bg-primary/5 px-3 py-1.5 rounded-[2px] border border-primary/5 flex items-center gap-2">
                            <Users size={14} className="text-accent" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Administrative Team</span>
                        </div>
                        <p className="text-primary/40 font-bold text-xs uppercase tracking-wider">{displayManagers.length} Authorized Personnel</p>
                    </div>
                </div>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="bg-primary text-white px-8 py-4 rounded-[2px] font-bold text-xs uppercase tracking-wider flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-primary/20 group"
                >
                    <UserPlus size={20} className="text-accent group-hover:scale-110 transition-transform" />
                    <span>Onboard Manager</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
                    <div className="relative group max-w-md w-full shadow-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Find managers by name, role or region..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-primary/5 rounded-[2px] pl-10 pr-4 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20 transition-all w-full"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-primary/5 rounded-[2px] text-primary/70 text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-sm">
                        <Filter size={16} className="text-accent" />
                        <span>Filter Roles</span>
                    </button>
                </div>
            </div>

            {/* Managers List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
                {filteredManagers.map((m, i) => (
                    <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-[2px] border border-primary/5 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-6">
                                    <div className="relative w-24 h-24 rounded-[2px] overflow-hidden border border-primary/5 bg-primary/5 group-hover:scale-105 transition-transform duration-500">
                                        <Image src={m.image} alt={m.name} fill className="object-cover" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-xl font-bold text-primary uppercase tracking-tight">{m.name}</h4>
                                            {m.rating >= 4.9 && <BadgeCheck size={20} className="text-accent" />}
                                        </div>
                                        <p className="text-sm font-bold text-accent uppercase tracking-widest leading-none">{m.role}</p>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${m.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]'}`} />
                                            <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">{m.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleEdit(m)}
                                    className="p-2 text-primary/20 hover:text-accent hover:bg-primary/5 rounded-[2px] transition-all"
                                >
                                    <MoreVertical size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(m.id)}
                                    className="p-2 text-primary/20 hover:text-red-500 hover:bg-red-50 rounded-[2px] transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 py-6 border-y border-primary/5 mb-8 bg-[#FAF9F6]/50 rounded-[2px] px-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Office Location</p>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={12} className="text-accent" />
                                        <p className="text-xs font-bold text-primary uppercase">{m.location}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Managed Sites</p>
                                    <div className="flex items-center gap-2">
                                        <Shield size={12} className="text-accent" />
                                        <p className="text-xs font-bold text-primary uppercase">{m.sites} Registry Entries</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3 text-primary/60 hover:text-primary transition-colors cursor-pointer group/link">
                                        <div className="w-8 h-8 rounded-[2px] bg-primary/5 flex items-center justify-center group-hover/link:bg-accent/10 group-hover/link:text-accent transition-all">
                                            <Mail size={14} />
                                        </div>
                                        <span className="text-xs font-semibold">{m.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-primary/60 hover:text-primary transition-colors cursor-pointer group/link">
                                        <div className="w-8 h-8 rounded-[2px] bg-primary/5 flex items-center justify-center group-hover/link:bg-accent/10 group-hover/link:text-accent transition-all">
                                            <Phone size={14} />
                                        </div>
                                        <span className="text-xs font-semibold">{m.phone}</span>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-[2px] text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-primary/10">
                                        <span>View Activity</span>
                                        <ArrowUpRight size={14} className="text-accent" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer stats bar */}
                        <div className="bg-primary px-8 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Efficiency Rating:</span>
                                <div className="flex items-center gap-1.5">
                                    <Star size={10} className="fill-accent text-accent" />
                                    <span className="text-xs font-bold text-white">{m.rating}</span>
                                </div>
                            </div>
                            <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">{m.level}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CREATE/EDIT MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                            className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-y-10 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-[2px] shadow-2xl z-[110] overflow-hidden flex flex-col border border-primary/5"
                        >
                            <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-[#FAF9F6]">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">{editingId ? 'Modify' : 'Onboard'} <span className="text-accent underline decoration-primary/10 underline-offset-8">Personnel</span></h2>
                                    <p className="text-xs font-bold text-primary/20 uppercase tracking-widest mt-1">Global Heritage Management Registry</p>
                                </div>
                                <button onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="w-10 h-10 rounded-[2px] border border-primary/5 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-white transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Full Legal Name</label>
                                        <input
                                            required value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Administrative Role</label>
                                        <input
                                            required value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Email Address</label>
                                        <input
                                            required type="email" value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Contact Phone</label>
                                        <input
                                            required value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Station Location</label>
                                    <input
                                        required value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Management Level</label>
                                        <select
                                            value={formData.level}
                                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none appearance-none cursor-pointer"
                                        >
                                            {["Junior", "Mid Level", "Senior Level", "Expert"].map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Active Sites</label>
                                        <input
                                            type="number" value={formData.sites}
                                            onChange={(e) => setFormData({ ...formData, sites: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest">Current Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="On Leave">On Leave</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </form>

                            <div className="p-8 border-t border-primary/5 bg-[#FAF9F6] flex gap-4">
                                <button onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="flex-1 py-4 border border-primary/5 rounded-[2px] text-xs font-bold uppercase tracking-widest text-primary/40">Cancel</button>
                                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-[2] py-4 bg-primary text-white rounded-[2px] text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group">
                                    {isSubmitting ? <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" /> : <><BadgeCheck size={16} className="text-accent group-hover:scale-110 transition-transform" /><span>{editingId ? 'Authorize Update' : 'Confirm Onboarding'}</span></>}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
