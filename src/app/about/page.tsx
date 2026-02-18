"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { Check, Star, Globe, ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Navbar />

            {/* 1. HERO SECTION - Clean & Artistic */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        {/* Left: Text Content */}
                        <div className="space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-4"
                            >
                                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center text-2xl">
                                    🌿
                                </div>
                                <span className="font-bold text-sm uppercase tracking-[0.4em] text-primary">About Ceylon Trips</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-6"
                            >
                                <h1 className="text-5xl md:text-7xl font-heading font-black text-primary leading-[1.1] uppercase">
                                    Crafting Timeless <br />
                                    <span className="text-secondary font-art capitalize tracking-normal text-6xl md:text-9xl block mt-4">Sri Lankan Experiences</span>
                                </h1>
                                <p className="text-gray-600 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                                    Discover the magic of Sri Lanka — where golden shores meet emerald highlands and ancient kingdoms whisper stories of the past. At <span className="text-primary font-bold">Ceylon Trips</span>, we design immersive journeys that blend luxury, culture, adventure, and authenticity.
                                </p>
                                <p className="text-gray-500 text-lg font-light leading-relaxed max-w-2xl">
                                    From the majestic heights of Sigiriya to serene tea plantations and wildlife safaris, every itinerary is thoughtfully curated to deliver unforgettable memories.
                                </p>
                            </motion.div>

                            {/* Why Travel With Us Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="pt-10 space-y-10"
                            >
                                <h4 className="text-xs font-black tracking-[0.4em] text-primary uppercase border-b border-sand pb-4 inline-block">Why Travel With Us?</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        { title: "Tailor-Made Journeys", desc: "Every trip is customized to match your travel style, interests, and pace." },
                                        { title: "Expert Local Guides", desc: "Deep cultural knowledge, hidden gems, and authentic insights." },
                                        { title: "Luxury Meets Authenticity", desc: "Handpicked hotels, private transfers, and exclusive experiences." },
                                        { title: "24/7 Dedicated Support", desc: "We are with you every step of your journey." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 group">
                                            <div className="mt-1 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                <Check className="h-4 w-4" />
                                            </div>
                                            <div className="space-y-1">
                                                <h5 className="font-bold text-gray-900 text-base">{item.title}</h5>
                                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Stats & Sign-off */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-12"
                            >
                                <div className="inline-flex items-center gap-8 bg-[#FDFBF7] px-10 py-6 rounded-[2.5rem] border border-sand shadow-sm">
                                    <div className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                                        <Globe className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-primary">10,000+</div>
                                        <div className="text-[11px] font-black tracking-[0.2em] text-secondary uppercase">Happy Travelers Worldwide</div>
                                    </div>
                                </div>
                                <p className="mt-12 text-primary font-art text-5xl italic drop-shadow-sm">Your Sri Lankan story begins here.</p>
                            </motion.div>
                        </div>

                        {/* Right: Immersive Image Gallery Section */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative h-[800px] w-full rounded-[4rem] overflow-hidden shadow-2xl group"
                            >
                                <Image
                                    src="/images/sigiriya-vibrant.jpg"
                                    alt="Majestic Sigiriya Lion Rock"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

                                {/* Floating Badge */}
                                <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-md px-8 py-6 rounded-[2rem] shadow-2xl border border-white/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Star className="text-yellow-500 w-6 h-6 fill-current" />
                                        <span className="text-xl font-bold text-gray-900">4.9/5 Rating</span>
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-tight text-center">Trusted globally</p>
                                </div>

                                {/* Bottom Caption */}
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="space-y-4">
                                        <span className="bg-white/20 backdrop-blur-lg text-white text-xs font-bold uppercase tracking-[0.3em] px-6 py-2 rounded-full border border-white/30 inline-block">
                                            The Lion Rock, Sigiriya
                                        </span>
                                        <h3 className="text-4xl font-bold text-white tracking-tight leading-tight">
                                            Where History Meets <br /> Modern Luxury
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative Sub-image */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="absolute -bottom-10 -right-10 w-64 h-64 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white hidden xl:block"
                            >
                                <Image src="/images/tea.png" fill alt="Ceylon Tea Estates" className="object-cover" />
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. VISION & VALUES STRIP */}
            <section className="py-20 bg-[#FDFBF7] border-y border-sand">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-between gap-12 text-center md:text-left">
                        {[
                            { title: "Local Heritage", desc: "Rooted in the soul of Ceylon" },
                            { title: "Sustainable Travel", desc: "Preserving beauty for generations" },
                            { title: "Global Excellence", desc: "Setting the gold standard in Asia" }
                        ].map((item, i) => (
                            <div key={i} className="flex-1 min-w-[250px] space-y-2">
                                <h4 className="text-lg font-black text-primary uppercase tracking-widest">{item.title}</h4>
                                <p className="text-gray-500 font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
