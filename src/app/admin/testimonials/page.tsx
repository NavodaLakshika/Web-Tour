"use client";

import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Star,
    Quote,
    X,
    Save,
    Loader2,
    Camera,
    MapPin,
    User,
    RefreshCw,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Notification state
    const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);

    // Delete Confirmation state
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        text: "",
        location: "",
        rating: 5,
        image: "",
        status: "published"
    });

    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `testimonials/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image: publicUrl }));
        } catch (error: any) {
            showNotification('error', 'Upload failed: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const fetchTestimonials = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setTestimonials(data);
        }
        setIsLoading(false);
    };

    const handleOpenModal = (testimonial?: any) => {
        if (testimonial) {
            setEditingId(String(testimonial.id));
            setFormData({
                name: testimonial.name,
                role: testimonial.role || "",
                text: testimonial.text,
                location: testimonial.location || "",
                rating: testimonial.rating || 5,
                image: testimonial.image || "",
                status: testimonial.status || "pending"
            });
        } else {
            setEditingId(null);
            setFormData({
                name: "",
                role: "",
                text: "",
                location: "",
                rating: 5,
                image: "",
                status: "pending"
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);

        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', deleteId);

        if (!error) {
            setTestimonials(prev => prev.filter(t => t.id !== deleteId));
            showNotification('success', 'Transmission removed from records');
        } else {
            showNotification('error', "Delete failed: " + error.message);
        }
        setIsDeleting(false);
        setDeleteId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingId) {
                const { error } = await supabase
                    .from('testimonials')
                    .update(formData)
                    .eq('id', editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('testimonials')
                    .insert([formData]);
                if (error) throw error;
            }

            setIsModalOpen(false);
            fetchTestimonials();
            showNotification('success', editingId ? 'Entry successfully updated' : 'New voice registered in heritage list');
        } catch (error: any) {
            showNotification('error', "Save failed: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredTestimonials = testimonials.filter(t =>
    (t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.text?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
    const paginatedTestimonials = filteredTestimonials.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
            {/* Shared Notification Banner */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className={`fixed top-10 left-1/2 z-[200] px-8 py-4 rounded-[8px] shadow-2xl flex items-center gap-4 border ${notification.type === 'success' ? 'bg-black text-white border-accent/20' :
                            notification.type === 'error' ? 'bg-red-600 text-white border-red-400' :
                                'bg-primary text-white border-white/10'
                            }`}
                    >
                        <div className={`w-2 h-2 rounded-full animate-pulse ${notification.type === 'success' ? 'bg-accent' : 'bg-white'}`} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{notification.message}</span>
                        <button onClick={() => setNotification(null)} className="ml-4 opacity-40 hover:opacity-100 transition-opacity">
                            <X size={14} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight uppercase">Testimonial <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">Registry</span></h1>
                    <p className="text-primary/40 text-xs font-bold uppercase tracking-[0.2em] mt-4">Manage the voices of our heritage explorers</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-[8px] text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-primary/20"
                >
                    <Plus size={16} className="text-accent" />
                    <span>Create Entry</span>
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[8px] border border-primary/5 shadow-sm">
                <div className="relative group max-w-md w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search transmissions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-[#FAF9F6] border border-primary/5 rounded-[8px] pl-16 pr-6 py-4 text-sm font-bold text-primary outline-none focus:ring-2 focus:ring-accent/10 transition-all w-full"
                    />
                </div>
                <button
                    onClick={fetchTestimonials}
                    className="flex items-center gap-2 text-primary/30 hover:text-primary transition-all text-[10px] font-black uppercase tracking-widest"
                >
                    <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                    Refetch Registry
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    <div className="col-span-full py-40 text-center">
                        <Loader2 className="w-10 h-10 animate-spin mx-auto text-accent mb-6" />
                        <p className="text-[10px] font-black text-primary/20 uppercase tracking-[0.3em]">Synching with global heritage servers...</p>
                    </div>
                ) : filteredTestimonials.length === 0 ? (
                    <div className="col-span-full py-40 text-center bg-white border border-primary/5 rounded-[8px]">
                        <Quote className="w-12 h-12 text-primary/5 mx-auto mb-6" />
                        <p className="text-[10px] font-black text-primary/20 uppercase tracking-[0.3em]">No explorers have registered their voices yet</p>
                    </div>
                ) : (
                    paginatedTestimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-primary/5 rounded-[8px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col h-full"
                        >
                            <div className="p-10 flex-1 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, starI) => (
                                            <Star
                                                key={starI}
                                                size={12}
                                                className={starI < t.rating ? "fill-accent text-accent" : "text-primary/10"}
                                            />
                                        ))}
                                    </div>
                                    <div className={`px-2 py-1 rounded-[8px] text-[8px] font-black uppercase tracking-widest border ${t.status === 'published' ? 'bg-green-50 text-green-600 border-green-200' :
                                        t.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                                            'bg-gray-50 text-gray-400 border-gray-200'
                                        }`}>
                                        {t.status || 'pending'}
                                    </div>
                                    <Quote className="text-primary/5 group-hover:text-accent/20 transition-colors ml-auto" size={32} />
                                </div>

                                <p className="text-sm font-bold text-primary/70 leading-relaxed italic">
                                    &quot;{t.text}&quot;
                                </p>

                                <div className="pt-8 border-t border-primary/5 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#FAF9F6] rounded-[8px] flex items-center justify-center text-primary/20 overflow-hidden relative border border-primary/5">
                                        {t.image ? (
                                            <Image src={t.image} alt={t.name} fill className="object-cover" />
                                        ) : (
                                            <User size={20} />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-black text-primary uppercase tracking-tight">{t.name}</h4>
                                        <p className="text-[9px] font-bold text-accent uppercase tracking-widest mt-0.5">{t.role}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-10 py-6 border-t border-primary/5 bg-[#FAF9F6] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MapPin size={10} className="text-accent" />
                                    <span className="text-[9px] font-black text-primary/30 uppercase tracking-widest">{t.location || "Global Explorers"}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleOpenModal(t)}
                                        className="p-2.5 text-primary/20 hover:text-primary hover:bg-white rounded-[8px] transition-all shadow-sm"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => setDeleteId(String(t.id))}
                                        className="p-2.5 text-primary/20 hover:text-red-500 hover:bg-red-50 rounded-[8px] transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4 bg-white p-6 border border-primary/5 rounded-[8px] shadow-sm">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className={`w-12 h-12 rounded-[8px] border flex items-center justify-center transition-all ${currentPage === 1
                            ? 'border-primary/5 text-primary/10 cursor-not-allowed'
                            : 'border-primary/5 text-primary hover:border-accent hover:bg-primary/5'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 text-[11px] font-black transition-all rounded-[8px] ${currentPage === i + 1
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-primary/30 hover:text-primary hover:bg-primary/5'
                                    }`}
                            >
                                {(i + 1).toString().padStart(2, '0')}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className={`w-12 h-12 rounded-[8px] border flex items-center justify-center transition-all ${currentPage === totalPages
                            ? 'border-primary/5 text-primary/10 cursor-not-allowed'
                            : 'border-primary/5 text-primary hover:border-accent hover:bg-primary/5'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5 rotate-180" />
                    </button>
                </div>
            )}



            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-primary/20 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[8px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-primary/5 relative z-10 overflow-hidden"
                        >
                            <div className="p-12">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold text-primary uppercase tracking-tight">
                                            {editingId ? "Update Entry" : "New Voice"}
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="p-2 text-primary/20 hover:text-primary transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="flex justify-center mb-8">
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-[8px] bg-[#FAF9F6] border-2 border-dashed border-primary/10 overflow-hidden flex items-center justify-center relative">
                                                {formData.image ? (
                                                    <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                                ) : (
                                                    <User size={32} className="text-primary/10" />
                                                )}
                                                {isUploading && (
                                                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                                        <Loader2 className="w-6 h-6 animate-spin text-accent" />
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-[8px] flex items-center justify-center text-primary shadow-lg border-2 border-white hover:scale-110 transition-all"
                                            >
                                                <Camera size={14} />
                                            </button>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30 ml-2">Explorer Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Sarah Mitchell"
                                                className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-6 py-4 text-sm font-bold text-primary focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30 ml-2">Explorer Persona</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                placeholder="e.g. Adventure Enthusiast"
                                                className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-6 py-4 text-sm font-bold text-primary focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30 ml-2">Voyage Transmission (Message)</label>
                                        <textarea
                                            required
                                            value={formData.text}
                                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                            rows={4}
                                            placeholder="The personalized attention to detail was incredible..."
                                            className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-6 py-4 text-sm font-bold text-primary focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all outline-none resize-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30 ml-2">Heritage Expedition</label>
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="e.g. Exploring Sigiriya"
                                                className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-6 py-4 text-sm font-bold text-primary focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30 ml-2">Voyage Sentiment (1-5)</label>
                                            <select
                                                required
                                                value={formData.rating}
                                                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                                className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-6 py-4 text-sm font-bold text-primary focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all outline-none"
                                            >
                                                {[5, 4, 3, 2, 1].map(num => (
                                                    <option key={num} value={num}>{num} Gold Stars</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30 ml-2">Moderation Status</label>
                                            <select
                                                required
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="w-full bg-[#FAF9F6] border border-primary/5 rounded-[8px] px-6 py-4 text-sm font-bold text-primary focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all outline-none"
                                            >
                                                <option value="pending">Pending Review</option>
                                                <option value="published">Published (Visible)</option>
                                                <option value="hidden">Hidden</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-8 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 py-5 border border-primary/10 rounded-[8px] text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 hover:bg-[#FAF9F6] transition-all"
                                        >
                                            CANCEL Registry
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 py-5 bg-primary text-white rounded-[8px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-black transition-all flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <Save size={16} className="text-accent" />
                                            )}
                                            <span>{editingId ? "Update Data" : "Register Voice"}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* PREMIUM DELETE CONFIRMATION MODAL */}
            <AnimatePresence>
                {deleteId && (
                    <div key="delete-modal-testimony" className="fixed inset-0 z-[100] flex items-center justify-center px-4">
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
                                    <h3 className="text-3xl font-bold text-primary uppercase tracking-tight">Erase Transmission</h3>
                                    <p className="text-[11px] font-bold text-primary/40 uppercase tracking-widest leading-loose max-w-sm mx-auto">
                                        You are about to permanently DELETE this voice from the heritage registry.
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
                                        {isDeleting ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
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
