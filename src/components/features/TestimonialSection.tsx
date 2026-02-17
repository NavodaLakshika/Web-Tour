"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, Star, Sparkles } from 'lucide-react';

export const TestimonialSection = () => {
    const testimonials = [
        {
            name: "Sarah Mitchell",
            role: "Adventure Enthusiast",
            text: "The personalized attention to detail was incredible. Our trip to Sigiriya and the Hill Country was seamlessly organized and truly unforgettable.",
            initials: "S",
            color: "bg-blue-100 text-blue-600"
        },
        {
            name: "James Wilson",
            role: "Family Traveler",
            text: "Ceylon Trips provided our family with an authentic taste of Sri Lanka. From tea plantation tours to wild safaris, every moment was perfectly curated.",
            initials: "J",
            color: "bg-pink-100 text-pink-600",
            highlight: true
        },
        {
            name: "Elena Rodriguez",
            role: "Cultural Explorer",
            text: "Exploring the ancient temples with their expert guides opened my eyes to the rich history of this beautiful island. Highly recommend their bespoke services.",
            initials: "E",
            color: "bg-orange-100 text-orange-600"
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                {/* Left Content */}
                <div className="lg:max-w-md text-center lg:text-left">
                    {/* Decoration */}
                    <div className="mb-6 relative w-16 h-16 mx-auto lg:mx-0">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="text-purple-500">
                                <path d="M10,50 Q40,10 90,50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                                <circle cx="90" cy="50" r="5" fill="#FACC15" /> {/* Yellow Star-ish dot */}
                            </svg>
                        </motion.div>
                        <Star className="text-yellow-400 w-6 h-6 absolute top-0 right-0 fill-yellow-400 rotate-12" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-6 leading-tight">
                        What Our <br /> Travelers Say
                    </h2>
                    <p className="text-slate-500 mb-8 leading-relaxed text-lg">
                        Hear from our community of global explorers who have experienced the magic of Sri Lanka through our curated journeys.
                    </p>
                </div>

                {/* Right Content: Vertical Cards */}
                <div className="flex-1 w-full max-w-xl flex flex-col gap-6 relative pl-8">
                    {/* The purple highlight line for the active card */}
                    <div className="absolute left-0 top-[38%] h-24 w-1.5 bg-indigo-600 rounded-full hidden lg:block" />

                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all duration-300 ${item.highlight ? 'scale-105 shadow-xl border-indigo-100 z-10' : 'opacity-80 scale-95 hover:opacity-100 hover:scale-100'}`}
                        >
                            <div className={`relative w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 ${item.color}`}>
                                {item.initials}
                            </div>
                            <div className="flex-1 text-left">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                                        <span className="text-xs text-slate-400 uppercase tracking-wider">{item.role}</span>
                                    </div>
                                    <Quote className="w-8 h-8 text-indigo-100 fill-indigo-50 rotate-180" />
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
