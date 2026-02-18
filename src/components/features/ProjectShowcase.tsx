"use client";

import React from "react";
import Image from "next/image";
import { Check, Star, Globe, MapPin, Shield, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const ProjectShowcase = () => {
    return (
        <section className="relative bg-white py-24 overflow-hidden">

            {/* ---------------- SECTION 1: ABOUT (Text Left, Grid Right) ---------------- */}
            <div className="container mx-auto px-6 lg:px-12 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                <span className="text-xl">🌿</span>
                            </div>
                            <span className="font-bold text-sm uppercase tracking-[0.3em] text-primary">About Ceylon Trips</span>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-heading font-black text-primary leading-[1.1] uppercase">
                                Crafting Timeless <br />
                                <span className="text-secondary font-art capitalize tracking-normal text-6xl md:text-8xl block mt-2">Sri Lankan Experiences</span>
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <p className="text-gray-600 text-xl font-light leading-relaxed max-w-xl">
                                Discover the magic of Sri Lanka — where golden shores meet emerald highlands and ancient kingdoms whisper stories of the past. At <span className="text-primary font-bold">Ceylon Trips</span>, we design immersive journeys that blend luxury, culture, adventure, and authenticity.
                            </p>
                            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-xl">
                                From the majestic heights of Sigiriya to serene tea plantations and wildlife safaris, every itinerary is thoughtfully curated to deliver unforgettable memories.
                            </p>
                        </div>

                        <div className="pt-8 space-y-8">
                            <h4 className="text-xs font-black tracking-[0.4em] text-primary uppercase border-b border-sand pb-4 inline-block">Why Travel With Us?</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: "Tailor-Made Journeys", desc: "Every trip is customized to match your travel style, interests, and pace." },
                                    { title: "Expert Local Guides", desc: "Deep cultural knowledge, hidden gems, and authentic insights." },
                                    { title: "Luxury Meets Authenticity", desc: "Handpicked hotels, private transfers, and exclusive experiences." },
                                    { title: "24/7 Dedicated Support", desc: "We are with you every step of your journey." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <div className="space-y-1">
                                            <h5 className="font-bold text-gray-900 text-sm">{item.title}</h5>
                                            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-10">
                            <div className="inline-flex items-center gap-6 bg-[#FDFBF7] px-8 py-5 rounded-[2rem] border border-sand shadow-sm group hover:shadow-md transition-all">
                                <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                                    <Globe className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="text-xl font-black text-primary">10,000+</div>
                                    <div className="text-[10px] font-black tracking-widest text-secondary uppercase">Happy Travelers Worldwide</div>
                                </div>
                            </div>
                            <p className="mt-8 text-primary font-art text-3xl italic">Your Sri Lankan story begins here.</p>
                        </div>
                    </div>

                    {/* Right Grid (Bento Style) */}
                    <div className="relative">
                        {/* Main Image Container */}
                        <div className="relative h-[650px] w-full rounded-[3rem] overflow-hidden shadow-2xl group">
                            <Image
                                src="/images/sigiriya.jpg"
                                alt="Scenic view of Sigiriya Lion Rock Fortress"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />

                            {/* Floating Stats Card 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="absolute top-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20 max-w-[200px]"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="text-yellow-500 w-5 h-5 fill-current" />
                                    <span className="font-bold text-gray-900">4.9/5 Rating</span>
                                </div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-tight">Trusted by explorers around the globe</p>
                            </motion.div>

                            {/* Bottom Label Overlay */}
                            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                <div className="space-y-2">
                                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/30">Authentic Ceylon</span>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">The Lion Rock, Sigiriya</h3>
                                </div>
                                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center text-primary shadow-xl hover:scale-110 transition-transform cursor-pointer">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
