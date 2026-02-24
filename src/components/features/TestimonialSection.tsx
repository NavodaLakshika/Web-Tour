"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Loader2, User, X, Camera } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

const fallbackTestimonials = [
    {
        name: "Sarah Mitchell",
        role: "Adventure Enthusiast",
        text: "The personalized attention to detail was incredible. Our trip to Sigiriya and the Hill Country was seamlessly organized and truly unforgettable.",
        location: "Exploring Sigiriya & Central Highlands",
        rating: 5,
        status: 'published'
    },
    {
        name: "James Wilson",
        role: "Wildlife Photographer",
        text: "Witnessing the Elephant Gathering in Minneriya was a spiritual experience. The guides' knowledge of animal behavior made it very special.",
        location: "Minneriya Safari & Polonnaruwa",
        rating: 5,
        status: 'published'
    },
    {
        name: "Elena Rodriguez",
        role: "Cultural Explorer",
        text: "The sunrise at Adam's Peak and the evening rituals at the Temple of the Tooth provided a deep connection to Sri Lanka's soul.",
        location: "Kandy & The Cultural Triangle",
        rating: 5,
        status: 'published'
    }
];

export const TestimonialSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [testimonials, setTestimonials] = useState<any[]>(fallbackTestimonials);
    const [loading, setLoading] = useState(true);

    // Submission Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        text: "",
        location: "",
        rating: 5,
        image: ""
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .eq('status', 'published')
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                // Merge database testimonials with fallbacks to keep a full list
                setTestimonials([...data, ...fallbackTestimonials]);
            }
        } catch (err) {
            console.error("Error fetching testimonials:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsSubmitting(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `guest_testimonials/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image: publicUrl }));
        } catch (error: any) {
            alert('Upload failed: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('testimonials')
                .insert([{ ...formData, status: 'published' }]);

            if (error) throw error;

            setShowSuccess(true);
            fetchTestimonials(); // Refresh the list so the new review shows up immediately
            setTimeout(() => {
                setIsModalOpen(false);
                setShowSuccess(false);
                setFormData({ name: "", role: "", text: "", location: "", rating: 5, image: "" });
            }, 3000);
        } catch (error: any) {
            // No alert - silent error or custom UI logic
            console.error("Submission failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className=" pb-32 bg-[#FDFBF7] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Left: Heading Content */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block">Testimonials</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-black uppercase tracking-tighter leading-[0.9]">
                                <div className="overflow-hidden">
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className="block"
                                    >
                                        What Our
                                    </motion.span>
                                </div>
                                <div className="overflow-hidden">
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                        className="text-gray-600 italic font-art lowercase tracking-normal block"
                                    >
                                        Travelers Say
                                    </motion.span>
                                </div>
                            </h2>
                            <p className="text-gray-400 text-sm font-bold tracking-widest uppercase leading-relaxed max-w-sm">
                                Hear from our community of global explorers who have experienced the magic of Sri Lanka through our curated journeys.
                            </p>

                            <div className="pt-10 flex flex-wrap items-center gap-4">
                                {/* Navigation Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={prev}
                                        className="w-12 h-12 rounded-full border border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 group"
                                    >
                                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={next}
                                        className="w-12 h-12 rounded-full border border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 group"
                                    >
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {/* Progress-Style Pagination */}
                                <div className="flex flex-col gap-4 ml-2 lg:ml-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-black">
                                            {(activeIndex + 1).toString().padStart(2, '0')}
                                        </span>
                                        <div className="w-24 h-[2px] bg-black/5 relative overflow-hidden">
                                            <motion.div
                                                initial={false}
                                                animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                                                className="absolute inset-y-0 left-0 bg-secondary"
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-black/20">
                                            {testimonials.length.toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {testimonials.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveIndex(i)}
                                                className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? 'bg-secondary w-8' : 'bg-black/10 w-4 hover:bg-black/20'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 flex flex-wrap items-center gap-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all duration-500 rounded-full flex items-center gap-3 shadow-xl shadow-black/5"
                                >
                                    Share Your Experience
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Testimonial Card */}
                    <div className="lg:col-span-7 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl shadow-black/[0.03] border border-black/[0.02] relative z-20"
                            >
                                <Quote className="absolute top-12 right-12 w-20 h-20 text-black/[0.03] -scale-x-100" />

                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < (testimonials[activeIndex].rating || 5) ? 'fill-secondary text-secondary' : 'text-gray-200'}`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-sm md:text-2xl font-art text-black/80 leading-relaxed italic">
                                        &quot;{testimonials[activeIndex].text}&quot;
                                    </p>

                                    <div className="pt-12 mt-4 border-t border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/20 relative flex-shrink-0 bg-secondary/5 flex items-center justify-center">
                                                {testimonials[activeIndex].image ? (
                                                    <Image
                                                        src={testimonials[activeIndex].image}
                                                        alt={testimonials[activeIndex].name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <User className="w-6 h-6 text-secondary/40" />
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-lg font-black uppercase tracking-tight text-black">
                                                    {testimonials[activeIndex].name}
                                                </h4>
                                                <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                                                    {testimonials[activeIndex].role}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 bg-[#FDFBF7] px-4 py-2 rounded-full border border-black/5">
                                            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                                {testimonials[activeIndex].location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Decorative stacks behind the main card */}
                        <div className="absolute top-4 left-4 right-4 bottom-4 bg-white/50 rounded-[3rem] z-10 translate-x-4 translate-y-4 border border-black/[0.01]" />
                        <div className="absolute top-8 left-8 right-8 bottom-8 bg-white/30 rounded-[3rem] z-0 translate-x-8 translate-y-8 border border-black/[0.01]" />
                    </div>

                </div>
            </div>

            {/* Submission Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isSubmitting && setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="bg-white w-full max-w-xl rounded-[2px] shadow-2xl relative z-10 overflow-hidden border border-black/5"
                        >
                            {showSuccess ? (
                                <div className="p-20 text-center space-y-6">
                                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                                        <Star className="w-10 h-10 text-secondary fill-secondary" />
                                    </div>
                                    <h3 className="text-3xl font-heading font-black uppercase tracking-tight">Transmission Received</h3>
                                    <p className="text-gray-400 text-sm font-bold tracking-widest uppercase leading-relaxed">
                                        Your experience has been logged in our heritage archives and is awaiting moderation.
                                    </p>
                                </div>
                            ) : (
                                <div className="p-10 md:p-14">
                                    <div className="flex justify-between items-center mb-10">
                                        <h3 className="text-2xl font-heading font-black uppercase tracking-tight">Share Your Journey</h3>
                                        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors"><X size={24} /></button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">FullName</label>
                                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 border border-black/5 rounded-[2px] px-6 py-4 text-sm font-bold text-black outline-none focus:border-secondary transition-all" placeholder="Sarah Mitchell" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Traverler Type</label>
                                                <input required type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full bg-gray-50 border border-black/5 rounded-[2px] px-6 py-4 text-sm font-bold text-black outline-none focus:border-secondary transition-all" placeholder="Explorer" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Transmission</label>
                                            <textarea required rows={4} value={formData.text} onChange={e => setFormData({ ...formData, text: e.target.value })} className="w-full bg-gray-50 border border-black/5 rounded-[2px] px-6 py-4 text-sm font-bold text-black outline-none focus:border-secondary transition-all resize-none" placeholder="How was your experience?" />
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Rating</span>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })} className="transition-transform hover:scale-125">
                                                            <Star size={20} className={star <= formData.rating ? "fill-secondary text-secondary" : "text-gray-200"} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[2px] border border-dashed border-black/10">
                                                <div className="w-12 h-12 rounded-[2px] bg-white flex items-center justify-center text-gray-400 overflow-hidden relative border border-black/5">
                                                    {formData.image ? <Image src={formData.image} alt="Preview" fill className="object-cover" /> : <Camera size={20} />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-black">Traveler Portrait</p>
                                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Optional identity verify</p>
                                                </div>
                                                <input type="file" id="guest-file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                <label htmlFor="guest-file" className="px-4 py-2 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-[2px] cursor-pointer hover:bg-secondary transition-colors">Upload</label>
                                            </div>
                                        </div>

                                        <button
                                            disabled={isSubmitting}
                                            className="w-full py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-[2px] hover:bg-secondary transition-all duration-500 shadow-xl shadow-black/10 flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Submit Transmission"}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
