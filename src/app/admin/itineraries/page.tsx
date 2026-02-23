"use client";

import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Map,
    Edit2,
    Trash2,
    Clock,
    ChevronLeft,
    ChevronRight,
    Compass,
    Globe,
    X,
    Check,
    MapPin,
    ArrowRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminItineraries() {
    const [dbItineraries, setDbItineraries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        duration: "3 DAYS",
        title: "The Cultural Triangle",
        route: "Colombo → Kandy",
        description: "",
        activities: "",
        image: "/images/sigiriya.jpg"
    });

    useEffect(() => {
        fetchItineraries();
    }, []);

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
        const filePath = `itineraries/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const fetchItineraries = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('itineraries')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setDbItineraries(data);
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = formData.image;

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const activitiesArray = formData.activities.split(',').map(a => a.trim()).filter(a => a !== "");

            const { error } = await supabase
                .from('itineraries')
                .insert([{
                    ...formData,
                    image: imageUrl,
                    activities: activitiesArray
                }]);

            if (error) throw error;

            setIsModalOpen(false);
            setFormData({
                duration: "3 DAYS",
                title: "",
                route: "",
                description: "",
                activities: "",
                image: "/images/sigiriya.jpg"
            });
            setImageFile(null);
            setImagePreview(null);
            fetchItineraries();
        } catch (error: any) {
            alert("Error adding itinerary: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-heading font-black text-primary tracking-tight uppercase">Route <span className="text-accent underline decoration-primary/10 underline-offset-8">Planner</span></h1>
                    <div className="flex items-center gap-3 mt-3">
                        <div className="bg-primary/5 px-3 py-1.5 rounded-md border border-primary/5 flex items-center gap-2">
                            <Map size={14} className="text-accent" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Live Itineraries</span>
                        </div>
                        <p className="text-primary/40 font-bold text-[11px] uppercase tracking-widest">Global Route Standards</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary text-white px-8 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-primary/95 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={18} className="text-accent" />
                    <span>Create New Route</span>
                </button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/5 animate-pulse">
                    <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                    <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">Syncing Routes with Supabase...</span>
                </div>
            )}

            {/* Itineraries List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {dbItineraries.map((route, i) => (
                    <div key={i} className="bg-white rounded-[24px] border border-primary/5 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                        <div className="p-8">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border border-primary/5 bg-primary/5">
                                        <Image src={route.image} alt={route.title} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-heading font-black text-primary group-hover:text-accent transition-colors uppercase leading-tight tracking-tight">
                                            {route.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <Clock size={10} className="text-accent" />
                                            <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{route.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="py-6 border-y border-primary/5 mb-8 bg-[#FAF9F6]/50 rounded-xl px-4">
                                <div className="flex items-center gap-3">
                                    <MapPin size={12} className="text-accent" />
                                    <p className="text-[10px] font-black text-primary leading-tight uppercase tracking-tight">{route.route}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-4 border border-primary/10 rounded-xl text-primary/60 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/5 transition-all">
                                    <Edit2 size={14} className="text-accent" />
                                    <span>Edit</span>
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/95 transition-all">
                                    <Trash2 size={14} className="text-accent" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CREATE MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-y-10 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-[32px] shadow-2xl z-[110] overflow-hidden flex flex-col border border-primary/5"
                        >
                            <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-[#FAF9F6]">
                                <div>
                                    <h2 className="text-2xl font-heading font-black text-primary uppercase tracking-tight">New <span className="text-accent">Route Entry</span></h2>
                                    <p className="text-[10px] font-black text-primary/30 uppercase tracking-widest mt-1">Expanding the Journey Collection</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full border border-primary/5 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-white transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                                {/* Image Upload */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Route Imagery</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className={`w-full h-48 rounded-[24px] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 overflow-hidden ${imagePreview ? 'border-accent bg-accent/5' : 'border-primary/10 bg-[#FAF9F6] group-hover:border-accent/40'}`}>
                                            {imagePreview ? (
                                                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                            ) : (
                                                <>
                                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent shadow-sm">
                                                        <Plus size={20} />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[11px] font-black text-primary uppercase tracking-widest">Select Route Image</p>
                                                        <p className="text-[9px] font-bold text-primary/30 uppercase mt-1 tracking-widest">PNG, JPG, WEBP — Max 5MB</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Route Duration</label>
                                        <input
                                            required
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            type="text"
                                            placeholder="e.g. 7 DAYS"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-xl px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Route Title</label>
                                        <input
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            type="text"
                                            placeholder="e.g. The Blue Highlands"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-xl px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Route Path</label>
                                    <input
                                        required
                                        value={formData.route}
                                        onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                                        type="text"
                                        placeholder="e.g. Colombo → Kandy → Ella"
                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-xl px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Activities (Comma separated)</label>
                                    <input
                                        required
                                        value={formData.activities}
                                        onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                                        type="text"
                                        placeholder="e.g. Whale Watching, Surfing, Cooking"
                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-xl px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                    />
                                </div>

                                <div className="space-y-2 pb-4">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Route Narrative</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-xl px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                    />
                                </div>
                            </form>

                            <div className="p-8 border-t border-primary/5 bg-[#FAF9F6] flex gap-4">
                                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border border-primary/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary/40 hover:bg-white hover:text-primary transition-all">Cancel</button>
                                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-[2] py-4 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                                    {isSubmitting ? <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" /> : <><Check size={16} className="text-accent" /><span>Authorize Route</span></>}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
