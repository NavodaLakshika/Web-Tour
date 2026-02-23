"use client";

import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    MapPin,
    Clock,
    ChevronLeft,
    ChevronRight,
    Briefcase,
    Activity,
    Globe,
    X,
    Check,
    Sparkles,
    Zap
} from "lucide-react";
import { experiences as staticExperiences } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminExperiences() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dbExperiences, setDbExperiences] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        category: "Adventure",
        location: "",
        price: "$0",
        duration: "2 Hours",
        difficulty: "Moderate",
        best_time: "Year-round",
        description: "",
        image: "/images/experience-1.jpg"
    });

    useEffect(() => {
        fetchExperiences();
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
        const filePath = `experiences/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file);

        if (uploadError) {
            if (uploadError.message.includes('bucket not found')) {
                throw new Error("Bucket 'media' not found in Supabase. Please ensure you created a bucket named 'media' and set it to PUBLIC.");
            }
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const fetchExperiences = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('experiences')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setDbExperiences(data);
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

            const submissionData = {
                ...formData,
                image: imageUrl
            };

            let error;
            if (editingId) {
                const { error: updateError } = await supabase
                    .from('experiences')
                    .update(submissionData)
                    .eq('id', editingId);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('experiences')
                    .insert([submissionData]);
                error = insertError;
            }

            if (error) throw error;

            setIsModalOpen(false);
            resetForm();
            fetchExperiences();
        } catch (error: any) {
            alert("Error saving entry: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this experience? This action cannot be undone.")) return;

        try {
            const { error } = await supabase
                .from('experiences')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchExperiences();
        } catch (error: any) {
            alert("Error deleting entry: " + error.message);
        }
    };

    const handleEdit = (exp: any) => {
        setEditingId(exp.id);
        setFormData({
            title: exp.title,
            category: exp.category,
            location: exp.location,
            price: exp.price,
            duration: exp.duration,
            difficulty: exp.difficulty,
            best_time: exp.best_time,
            description: exp.description,
            image: exp.image
        });
        setImagePreview(exp.image);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            category: "Adventure",
            location: "",
            price: "$0",
            duration: "2 Hours",
            difficulty: "Moderate",
            best_time: "Year-round",
            description: "",
            image: "/images/experience-1.jpg"
        });
        setImageFile(null);
        setImagePreview(null);
        setEditingId(null);
    };

    const displayData = dbExperiences.length > 0 ? dbExperiences : staticExperiences;

    const filteredExperiences = displayData.filter(exp =>
        exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight uppercase">Experience <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">Registry</span></h1>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="bg-primary/5 px-3 py-1.5 rounded-[2px] border border-primary/5 flex items-center gap-2">
                            <Briefcase size={14} className="text-accent" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Active Expeditions</span>
                        </div>
                        <p className="text-primary/40 font-bold text-xs uppercase tracking-wider">Curated Series Standards</p>
                    </div>
                </div>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="bg-primary text-white px-8 py-4 rounded-[2px] font-bold text-xs uppercase tracking-wider flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-primary/20 group"
                >
                    <Plus size={20} className="text-accent group-hover:scale-110 transition-transform" />
                    <span>Create Experience Entry</span>
                </button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-[2px] border border-primary/5 animate-pulse">
                    <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                    <span className="text-xs font-bold text-primary/40 uppercase tracking-wider">Syncing Series with Supabase...</span>
                </div>
            )}

            {!isLoading && dbExperiences.length === 0 && (
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-[2px] border border-orange-100">
                    <Sparkles size={16} className="text-orange-500" />
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Running on Local Series Backup</span>
                </div>
            )}

            {/* Sub-nav tabs */}
            <div className="flex border-b border-primary/5 mt-[-10px] overflow-x-auto scrollbar-hide">
                {["ALL SERIES", "UPCOMING", "ARCHIVED", "DRAFTS"].map((tab, i) => (
                    <button
                        key={tab}
                        className={`px-8 py-4 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${i === 0 ? "text-primary" : "text-primary/30 hover:text-primary/60"}`}
                    >
                        {tab}
                        {i === 0 && <div className="absolute bottom-[-1px] left-0 right-0 h-[4px] bg-accent rounded-t-lg shadow-[0_-4px_10px_rgba(212,175,55,0.4)]" />}
                    </button>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h3 className="text-xs font-bold text-primary/30 uppercase tracking-widest">{filteredExperiences.length} SERIES VERIFIED</h3>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Find experience..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-primary/5 rounded-[2px] pl-10 pr-4 py-3 text-xs font-bold uppercase tracking-wider outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 transition-all w-72 shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Experiences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                {filteredExperiences.map((exp, i) => (
                    <div key={i} className="bg-white rounded-[2px] border border-primary/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group relative">
                        <div className="absolute top-4 right-4 z-10">
                            <div className="bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-[2px] border border-accent/20 flex items-center gap-1.5 shadow-xl">
                                <Zap size={10} className="text-accent fill-accent" />
                                <span className="text-[9px] font-bold text-white uppercase tracking-widest">{exp.category}</span>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-14 h-14 rounded-[2px] overflow-hidden flex-shrink-0 border border-primary/5 bg-primary/5 group-hover:scale-110 transition-transform duration-500">
                                        <Image src={exp.image} alt={exp.title} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-[18px] font-bold text-primary group-hover:text-accent transition-colors uppercase leading-tight">
                                            {exp.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <MapPin size={10} className="text-accent" />
                                            <span className="text-xs font-bold text-primary/30 uppercase tracking-wider">{exp.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex divide-x divide-primary/5 py-6 border-y border-primary/5 mb-8 bg-[#FAF9F6]/50 rounded-[2px] px-4">
                                <div className="flex-1 text-center">
                                    <p className="text-xs font-bold text-primary leading-tight uppercase">{exp.duration}</p>
                                    <p className="text-[9px] font-bold text-primary/20 mt-1 uppercase tracking-widest">DURATION</p>
                                </div>
                                <div className="flex-1 text-center pl-6">
                                    <p className="text-xs font-bold text-primary leading-tight uppercase">{exp.price}</p>
                                    <p className="text-[9px] font-bold text-primary/20 mt-1 uppercase tracking-widest">FEES</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleEdit(exp)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-4 border border-primary/10 rounded-[2px] text-primary/60 text-xs font-bold uppercase tracking-wider hover:bg-primary/5 transition-all"
                                >
                                    <Edit2 size={14} className="text-accent" />
                                    <span>Edit Series</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(exp.id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-primary text-white rounded-[2px] text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-lg shadow-primary/20 group"
                                >
                                    <Trash2 size={14} className="text-accent group-hover:scale-110 transition-transform" />
                                    <span>Archive</span>
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
                            onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                            className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-y-10 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-[2px] shadow-2xl z-[110] overflow-hidden flex flex-col border border-primary/5"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-[#FAF9F6]">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">{editingId ? 'Edit' : 'New'} <span className="text-accent underline decoration-primary/10 underline-offset-8">Experience Series</span></h2>
                                    <p className="text-xs font-bold text-primary/20 uppercase tracking-widest mt-1">{editingId ? 'Refining Series Records' : 'Expanding the Signature Portfolio'}</p>
                                </div>
                                <button onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="w-10 h-10 rounded-[2px] border border-primary/5 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-white transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                                {/* Image Upload */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-1">Series Imagery</label>
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
                                                    <div className="w-12 h-12 rounded-[2px] bg-white flex items-center justify-center text-accent shadow-sm">
                                                        <Plus size={20} />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[11px] font-bold text-primary uppercase tracking-widest">Select Series Image</p>
                                                        <p className="text-[9px] font-bold text-primary/30 uppercase mt-1 tracking-widest">PNG, JPG, WEBP — Max 5MB</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-1">Series Title</label>
                                        <input
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            type="text"
                                            placeholder="e.g. Whale Watching"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-1">Location</label>
                                        <input
                                            required
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            type="text"
                                            placeholder="e.g. Mirissa"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-1">Series Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all appearance-none cursor-pointer shadow-sm"
                                        >
                                            {["Adventure", "Wildlife", "Culinary", "Wellness", "Festivals", "Heritage"].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-1">Duration</label>
                                        <input
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            type="text"
                                            placeholder="e.g. 4 Hours"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">In-depth Narrative</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        placeholder="Describe the soul of this experience..."
                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all shadow-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6 pb-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-1">Difficulty Level</label>
                                        <select
                                            value={formData.difficulty}
                                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all appearance-none cursor-pointer shadow-sm"
                                        >
                                            {["Easy", "Moderate", "Challenging", "Expert"].map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-1">Estimated Fees</label>
                                        <input
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            type="text"
                                            placeholder="$50 or Free"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[2px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                            </form>

                            <div className="p-8 border-t border-primary/5 bg-[#FAF9F6] flex gap-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 border border-primary/5 rounded-[2px] text-xs font-bold uppercase tracking-wider text-primary/40 hover:bg-white hover:text-primary transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex-[2] py-4 bg-primary text-white rounded-[2px] text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                                    ) : (
                                        <>
                                            <Check size={16} className="text-accent group-hover:scale-110 transition-transform" />
                                            <span>{editingId ? 'Update Series' : 'Authorize Series Entry'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
