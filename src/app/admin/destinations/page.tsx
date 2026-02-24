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
    Star,
    ChevronLeft,
    ChevronRight,
    Award,
    Heart,
    Check,
    Compass,
    Activity,
    Globe,
    X
} from "lucide-react";
import { destinations as staticDestinations } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDestinations() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dbDestinations, setDbDestinations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Delete Confirmation state
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        region: "Central",
        interest: "Cultural",
        category: "Historical",
        rating: "4.5",
        image: "/images/sigiriya-vibrant.jpg", // Default or will be replaced by upload URL
        description: "",
        best_time: "January to April",
        price: "$0"
    });

    useEffect(() => {
        fetchDestinations();
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
        const filePath = `destinations/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file);

        if (uploadError) {
            // If upload fails, it might be the bucket doesn't exist or policy is wrong
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

    const fetchDestinations = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('destinations')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setDbDestinations(data);
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

            const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
            const submissionData = {
                ...formData,
                image: imageUrl,
                slug,
                rating: parseFloat(formData.rating)
            };

            let error;
            if (editingId) {
                const { error: updateError } = await supabase
                    .from('destinations')
                    .update(submissionData)
                    .eq('id', editingId);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('destinations')
                    .insert([submissionData]);
                error = insertError;
            }

            if (error) throw error;

            setIsModalOpen(false);
            resetForm();
            fetchDestinations();
        } catch (error: any) {
            alert("Error saving entry: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);

        try {
            const { error } = await supabase
                .from('destinations')
                .delete()
                .eq('id', deleteId);

            if (error) throw error;
            fetchDestinations();
        } catch (error: any) {
            alert("Error deleting entry: " + error.message);
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const handleEdit = (dest: any) => {
        setEditingId(dest.id);
        setFormData({
            name: dest.name,
            location: dest.location,
            region: dest.region,
            interest: dest.interest,
            category: dest.category,
            rating: dest.rating.toString(),
            image: dest.image,
            description: dest.description || "",
            best_time: dest.best_time || "",
            price: dest.price || "$0"
        });
        setImagePreview(dest.image);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            name: "",
            location: "",
            region: "Central",
            interest: "Cultural",
            category: "Historical",
            rating: "4.5",
            image: "/images/sigiriya-vibrant.jpg",
            description: "",
            best_time: "January to April",
            price: "$0"
        });
        setImageFile(null);
        setImagePreview(null);
        setEditingId(null);
    };

    // Use DB data if available, otherwise fallback to static for safety
    const displayData = dbDestinations.length > 0 ? dbDestinations : staticDestinations;

    const filteredDestinations = displayData.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight uppercase">Registry <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">EDITment</span></h1>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="bg-primary/5 px-3 py-1.5 rounded-[8px] border border-primary/5 flex items-center gap-2">
                            <Compass size={14} className="text-accent" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Signature Portfolio</span>
                        </div>
                        <p className="text-primary/40 font-bold text-xs uppercase tracking-wider">Global Heritage Standards</p>
                    </div>
                </div>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="bg-primary text-white px-8 py-4 rounded-[8px] font-bold text-xs uppercase tracking-wider flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-primary/20 group"
                >
                    <Plus size={20} className="text-accent group-hover:scale-110 transition-transform" />
                    <span>Create Heritage Entry</span>
                </button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-[8px] border border-primary/5 animate-pulse">
                    <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                    <span className="text-xs font-bold text-primary/40 uppercase tracking-wider">Syncing with Supabase Registry...</span>
                </div>
            )}

            {!isLoading && dbDestinations.length === 0 && (
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-[8px] border border-orange-100">
                    <Globe size={16} className="text-orange-500" />
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Running on Local Backup (No DB records found)</span>
                </div>
            )}

            {/* Sub-nav tabs - consistency with dashboard */}
            <div className="flex border-b border-primary/5 mt-[-10px] overflow-x-auto scrollbar-hide">
                {["ALL REGISTRY", "PENDING REVIEW", "ARCHIVED SITES", "DRAFTS"].map((tab, i) => (
                    <button
                        key={tab}
                        className={`px-8 py-4 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${i === 0 ? "text-primary" : "text-primary/30 hover:text-primary/60"}`}
                    >
                        {tab}
                        {i === 0 && <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-accent rounded-t-full shadow-[0_-4px_10px_rgba(212,175,55,0.4)]" />}
                    </button>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h3 className="text-xs font-bold text-primary/40 uppercase tracking-widest">{filteredDestinations.length} LOCATIONS VERIFIED</h3>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Find heritage site..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-primary/5 rounded-[8px] pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all w-72 shadow-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border border-primary/5 rounded-[8px] text-primary/70 text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-sm group">
                        <Filter size={16} className="text-accent group-hover:text-gold transition-colors" />
                        <span>Filter Sites</span>
                    </button>
                </div>
            </div>

            {/* Destinations Grid - Using the premium card style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                {filteredDestinations.map((dest, i) => (
                    <div key={i} className="bg-white rounded-[8px] border border-primary/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group relative">
                        {/* Status Overlays */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <div className="bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-[8px] border border-accent/20 flex items-center gap-1.5 shadow-xl">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Active</span>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-14 h-14 rounded-[8px] overflow-hidden flex-shrink-0 border border-primary/5 bg-primary/5 group-hover:scale-110 transition-transform duration-500">
                                        <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-bold text-primary group-hover:text-accent transition-colors uppercase leading-tight tracking-tight">
                                            {dest.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} className={`${s <= Math.floor(parseFloat(dest.rating)) ? 'fill-accent text-accent' : 'text-primary/10'}`} />)}
                                            </div>
                                            <span className="text-xs font-semibold text-primary/40 uppercase tracking-wider">{dest.rating} (Verified)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex divide-x divide-primary/5 py-6 border-y border-primary/5 mb-8 bg-[#FAF9F6]/50 rounded-[8px] px-4">
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-primary leading-tight uppercase tracking-tight">{dest.location}</p>
                                    <p className="text-[10px] font-bold text-primary/20 mt-1 uppercase tracking-widest">PROVINCE</p>
                                </div>
                                <div className="flex-1 pl-6">
                                    <p className="text-xs font-bold text-primary leading-tight uppercase">{dest.interest}</p>
                                    <p className="text-[10px] font-bold text-primary/20 mt-1 uppercase tracking-widest">CATEGORY</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleEdit(dest)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-4 border border-primary/10 rounded-[8px] text-primary/60 text-xs font-bold uppercase tracking-wider hover:bg-primary/5 transition-all"
                                >
                                    <Edit2 size={14} className="text-accent" />
                                    <span>EDIT</span>
                                </button>
                                <button
                                    onClick={() => setDeleteId(String(dest.id))}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-primary text-white rounded-[8px] text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-lg shadow-primary/20 group"
                                >
                                    <Trash2 size={14} className="text-accent group-hover:scale-110 transition-transform" />
                                    <span>DELETE</span>
                                </button>
                            </div>

                            <div className="mt-6 pt-5 border-t border-primary/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Globe size={12} className="text-accent" />
                                    <span className="text-[9px] font-black text-primary/30 uppercase tracking-widest">Portal Visibility: Global</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary/20 hover:text-accent hover:bg-primary transition-all cursor-pointer">
                                    <MoreVertical size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4 pb-12">
                <p className="text-xs text-primary/40 font-bold uppercase tracking-wider">Signature Registry Pagination</p>
                <div className="flex gap-3">
                    <button className="p-3 border border-primary/5 bg-white rounded-[8px] text-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm opacity-50 cursor-not-allowed">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="p-3 border border-primary/5 bg-white rounded-[8px] text-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm">
                        <ChevronRight size={20} />
                    </button>
                </div>
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
                            className="fixed inset-y-10 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-[8px] shadow-2xl z-[110] overflow-hidden flex flex-col border border-primary/5"
                        >
                            <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-[#FAF9F6]">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">{editingId ? 'Edit' : 'New'} <span className="text-accent">Heritage Entry</span></h2>
                                    <p className="text-xs font-semibold text-primary/30 uppercase tracking-wider mt-1">{editingId ? 'Refining Registry Records' : 'Expanding the Signature Registry'}</p>
                                </div>
                                <button onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="w-10 h-10 rounded-full border border-primary/5 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-white transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                                {/* Image Upload Section */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Location Imagery</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className={`w-full h-48 rounded-[8px] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 overflow-hidden ${imagePreview ? 'border-accent bg-accent/5' : 'border-primary/10 bg-[#FAF9F6] group-hover:border-accent/40'}`}>
                                            {imagePreview ? (
                                                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                            ) : (
                                                <>
                                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent shadow-sm">
                                                        <Plus size={20} />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[11px] font-black text-primary uppercase tracking-widest">Select Heritage Image</p>
                                                        <p className="text-[9px] font-bold text-primary/30 uppercase mt-1 tracking-widest">PNG, JPG, WEBP — Max 5MB</p>
                                                    </div>
                                                </>
                                            )}
                                            {imagePreview && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] bg-primary/80 px-4 py-2 rounded-[8px]">Replace Image</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Site Name</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            type="text"
                                            placeholder="e.g. Sigiriya Rock"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Location</label>
                                        <input
                                            required
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            type="text"
                                            placeholder="e.g. Matale District"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Region</label>
                                        <select
                                            value={formData.region}
                                            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all appearance-none cursor-pointer"
                                        >
                                            {["Central", "South", "North", "East", "West"].map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all appearance-none cursor-pointer"
                                        >
                                            {["Historical", "Nature", "Beach", "City", "Wildlife", "Adventure"].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Brief Description</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        placeholder="Describe the historical significance or natural beauty..."
                                        className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6 pb-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Performance Rating</label>
                                        <input
                                            value={formData.rating}
                                            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                            type="number" step="0.1" max="5"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-1">Access Fee</label>
                                        <input
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            type="text"
                                            placeholder="$30 or Free"
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-5 py-3 text-xs font-bold outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                </div>
                            </form>

                            {/* Modal Footer */}
                            <div className="p-8 border-t border-primary/5 bg-[#FAF9F6] flex gap-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 border border-primary/5 rounded-[8px] text-[10px] font-black uppercase tracking-widest text-primary/40 hover:bg-white hover:text-primary transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex-[2] py-4 bg-primary text-white rounded-[8px] text-[10px] font-black uppercase tracking-widest hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                                    ) : (
                                        <>
                                            <Check size={16} className="text-accent" />
                                            <span>{editingId ? 'Update Registry' : 'Authorize Entry'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* PREMIUM DELETE CONFIRMATION MODAL */}
            <AnimatePresence>
                {deleteId && (
                    <div key="delete-modal" className="fixed inset-0 z-[100] flex items-center justify-center px-4">
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
                            className="bg-white w-full max-w-lg rounded-[8px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden relative"
                        >
                            <div className="p-12 text-center space-y-8">
                                <div className="relative mx-auto w-24 h-24">
                                    <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping" />
                                    <div className="relative w-full h-full bg-red-50 rounded-full flex items-center justify-center text-red-500 shadow-xl shadow-red-500/10">
                                        <Trash2 size={48} strokeWidth={1.5} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-3xl font-bold text-primary uppercase tracking-tight">Erase Heritage Site</h3>
                                    <p className="text-[11px] font-bold text-primary/40 uppercase tracking-widest leading-loose max-w-sm mx-auto">
                                        You are about to permanently DELETE this destination from the heritage registry.
                                        <br /><span className="text-red-500/60 text-[9px]">CAUTION: This cryptographic action is permanent.</span>
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setDeleteId(null)}
                                        className="flex-1 px-8 py-5 border border-primary/5 rounded-[8px] text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-all"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="flex-1 px-8 py-5 bg-red-600 text-white rounded-[8px] text-[10px] font-bold uppercase tracking-widest shadow-2xl shadow-red-600/30 hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isDeleting ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Trash2 size={16} />}
                                        <span>{isDeleting ? "DELETING..." : "DELETE"}</span>
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
