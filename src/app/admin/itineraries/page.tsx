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
    const [editingId, setEditingId] = useState<string | null>(null);

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
            const submissionData = {
                ...formData,
                image: imageUrl,
                activities: activitiesArray
            };

            let error;
            if (editingId) {
                const { error: updateError } = await supabase
                    .from('itineraries')
                    .update(submissionData)
                    .eq('id', editingId);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('itineraries')
                    .insert([submissionData]);
                error = insertError;
            }

            if (error) throw error;

            setIsModalOpen(false);
            resetForm();
            fetchItineraries();
        } catch (error: any) {
            alert("Error saving itinerary: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this route? This action cannot be undone.")) return;

        try {
            const { error } = await supabase
                .from('itineraries')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchItineraries();
        } catch (error: any) {
            alert("Error deleting entry: " + error.message);
        }
    };

    const handleEdit = (route: any) => {
        setEditingId(route.id);
        setFormData({
            duration: route.duration,
            title: route.title,
            route: route.route,
            description: route.description || "",
            activities: Array.isArray(route.activities) ? route.activities.join(', ') : (route.activities || ""),
            image: route.image
        });
        setImagePreview(route.image);
        setIsModalOpen(true);
    };

    const resetForm = () => {
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
        setEditingId(null);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight uppercase">Route <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">Planner</span></h1>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="bg-primary/5 px-3 py-1.5 rounded-[2px] border border-primary/5 flex items-center gap-2">
                            <Map size={14} className="text-accent" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Live Itineraries</span>
                        </div>
                        <p className="text-primary/40 font-bold text-xs uppercase tracking-wider">Global Route Standards</p>
                    </div>
                </div>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="bg-primary text-white px-8 py-4 rounded-[2px] font-bold text-xs uppercase tracking-wider flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-primary/20 group"
                >
                    <Plus size={20} className="text-accent group-hover:scale-110 transition-transform" />
                    <span>Create New Route</span>
                </button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-[2px] border border-primary/5 animate-pulse">
                    <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                    <span className="text-xs font-bold text-primary/40 uppercase tracking-wider">Syncing Routes with Supabase...</span>
                </div>
            )}

            {/* Itineraries List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {dbItineraries.map((route, i) => (
                    <div key={i} className="bg-white rounded-[2px] border border-primary/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden group relative">
                        <div className="p-8">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-14 h-14 rounded-[2px] overflow-hidden flex-shrink-0 border border-primary/5 bg-primary/5">
                                        <Image src={route.image} alt={route.title} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-[18px] font-bold text-primary uppercase tracking-tight group-hover:text-accent transition-colors leading-tight">
                                            {route.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <Clock size={10} className="text-accent" />
                                            <span className="text-xs font-bold text-primary/30 uppercase tracking-wider">{route.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="py-6 border-y border-primary/5 mb-8 bg-[#FAF9F6]/50 rounded-[2px] px-4">
                                <div className="flex items-center gap-3">
                                    <MapPin size={12} className="text-accent" />
                                    <p className="text-xs font-bold text-primary leading-tight uppercase tracking-tight">{route.route}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleEdit(route)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-4 border border-primary/10 rounded-[2px] text-primary/60 text-xs font-bold uppercase tracking-wider hover:bg-primary/5 transition-all"
                                >
                                    <Edit2 size={14} className="text-accent" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(route.id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-primary text-white rounded-[2px] text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-lg shadow-primary/20 group"
                                >
                                    <Trash2 size={14} className="text-accent group-hover:scale-110 transition-transform" />
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
                            onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                            className="fixed inset-y-10 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-[2px] shadow-2xl z-[110] overflow-hidden flex flex-col border border-primary/5"
                        >
                            <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-[#FAF9F6]">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">{editingId ? 'Edit' : 'New'} <span className="text-accent underline decoration-primary/10 underline-offset-8">Route Entry</span></h2>
                                    <p className="text-xs font-bold text-primary/20 uppercase tracking-widest mt-1">{editingId ? 'Refining Itinerary Path' : 'Expanding the Journey Collection'}</p>
                                </div>
                                <button onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="w-10 h-10 rounded-[2px] border border-primary/5 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-white transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                                {/* Image Upload */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Route Imagery</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className={`w-full h-48 rounded-[2px] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 overflow-hidden ${imagePreview ? 'border-accent bg-accent/5' : 'border-primary/10 bg-[#FAF9F6] group-hover:border-accent/40'}`}>
                                            {imagePreview ? (
                                                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                            ) : (
                                                <>
                                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent shadow-sm">
                                                        <Plus size={20} />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[11px] font-bold text-primary uppercase tracking-widest">Select Route Image</p>
                                                        <p className="text-[9px] font-bold text-primary/30 uppercase mt-1 tracking-widest">PNG, JPG, WEBP — Max 5MB</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest ml-1">Route Duration</label>
                                        <input
                                            required
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            type="text"
                                            placeholder="e.g. 7 DAYS"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest ml-1">Route Title</label>
                                        <input
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            type="text"
                                            placeholder="e.g. The Blue Highlands"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest ml-1">Route Path</label>
                                    <input
                                        required
                                        value={formData.route}
                                        onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                                        type="text"
                                        placeholder="e.g. Colombo → Kandy → Ella"
                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest ml-1">Activities (Comma separated)</label>
                                    <input
                                        required
                                        value={formData.activities}
                                        onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                                        type="text"
                                        placeholder="e.g. Whale Watching, Surfing, Cooking"
                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                    />
                                </div>

                                <div className="space-y-2 pb-4">
                                    <label className="text-[10px] font-bold text-primary/20 uppercase tracking-widest ml-1">Route Narrative</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                    />
                                </div>
                            </form>

                            <div className="p-8 border-t border-primary/5 bg-[#FAF9F6] flex gap-4">
                                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border border-primary/5 rounded-[2px] text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:bg-white hover:text-primary transition-all">Cancel</button>
                                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-[2] py-4 bg-primary text-white rounded-[2px] text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group">
                                    {isSubmitting ? <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" /> : <><Check size={16} className="text-accent group-hover:scale-110 transition-transform" /><span>{editingId ? 'Update Route' : 'Authorize Route'}</span></>}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
