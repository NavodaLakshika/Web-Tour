"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const TestimonialSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            name: "Sarah Mitchell",
            role: "Adventure Enthusiast",
            text: "The personalized attention to detail was incredible. Our trip to Sigiriya and the Hill Country was seamlessly organized and truly unforgettable.",
            location: "Exploring Sigiriya & Central Highlands"
        },
        {
            name: "James Wilson",
            role: "Family Traveler",
            text: "Ceylon Trips provided our family with an authentic taste of Sri Lanka. From tea plantation tours to wild safaris, every moment was perfectly curated.",
            location: "Tea Estates & Yala Safari"
        },
        {
            name: "Elena Rodriguez",
            role: "Cultural Explorer",
            text: "Exploring the ancient temples with their expert guides opened my eyes to the rich history of this beautiful island. Highly recommend their bespoke services.",
            location: "Ancient Cities & Heritage Sites"
        }
    ];

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

                                {/* Numbered Pagination */}
                                <div className="flex items-center gap-3 ml-2 lg:ml-6">
                                    {testimonials.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveIndex(i)}
                                            className={`w-10 h-10 text-[11px] font-black transition-all ${activeIndex === i
                                                ? 'text-black border-b-2 border-secondary'
                                                : 'text-black/20 hover:text-black'
                                                }`}
                                        >
                                            {(i + 1).toString().padStart(2, '0')}
                                        </button>
                                    ))}
                                </div>
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
                                            <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                                        ))}
                                    </div>

                                    <p className="text-sm md:text-2xl font-art text-black/80 leading-relaxed italic">
                                        &quot;{testimonials[activeIndex].text}&quot;
                                    </p>

                                    <div className="pt-12 mt-4 border-t border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-1">
                                            <h4 className="text-lg font-black uppercase tracking-tight text-black">
                                                {testimonials[activeIndex].name}
                                            </h4>
                                            <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                                                {testimonials[activeIndex].role}
                                            </p>
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
        </section>
    );
};

