"use client";

import React from "react";
import Image from "next/image";
import { Check, Star, Download, MapPin, Shield, Clock, ArrowRight } from "lucide-react";
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
                                <Image src="/images/sigiriya.jpg" alt="icon" width={20} height={20} className="rounded-full object-cover w-full h-full p-1" />
                            </div>
                            <span className="font-bold text-sm uppercase tracking-widest text-primary">About Ceylon Trips</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-heading font-black text-primary leading-[1.1] uppercase">
                            Curating Unforgettable <br />
                            <span className="text-secondary font-art capitalize tracking-normal text-5xl md:text-7xl lowercase">Sri Lankan Journeys</span>
                        </h2>

                        <p className="text-gray-600 text-xl font-light leading-relaxed max-w-xl italic opacity-90">
                            "Experience the pearl of the Indian Ocean with our bespoke travel packages.
                            We combine luxury, adventure, and culture to create memories that last a lifetime."
                        </p>

                        <ul className="space-y-4 mt-6">
                            {[
                                "Personalized itineraries tailored to your interests",
                                "Expert local guides with deep cultural knowledge",
                                "24/7 dedicated support throughout your trip"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-white flex-shrink-0">
                                        <Check className="h-3 w-3" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <div className="inline-flex items-center gap-4 bg-sand/20 px-6 py-3 rounded-full">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                                            {/* Placeholder avatars */}
                                            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm font-bold text-secondary">
                                    <span className="text-primary">10k+</span> Happy Travelers
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Grid (Bento Style) */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
                            <Image
                                src="/images/sigiriya.jpg"
                                alt="Sri Lanka Nature"
                                fill
                                className="object-cover"
                            />

                            {/* Floating Stats Card 1 */}
                            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 max-w-[180px]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="text-yellow-500 w-5 h-5 fill-current" />
                                    <span className="font-bold text-secondary">4.9/5</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-tight">Rated excellent by travelers worldwide</p>
                            </div>

                            {/* Floating Stats Card 2 */}
                            <div className="absolute bottom-8 left-8 bg-secondary text-white p-5 rounded-2xl shadow-lg max-w-[200px]">
                                <div className="text-3xl font-bold mb-1">15+</div>
                                <div className="text-xs font-medium opacity-80 uppercase tracking-wider mb-2">Years Experience</div>
                                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-primary rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
