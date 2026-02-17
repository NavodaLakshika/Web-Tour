"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const galleryImages = [
    "/images/galle.jpg",
    "/images/sigiriya.jpg",
    "/images/ella.jpg",
    "/images/train.jpg",
    "/images/kandy.jpg",
    "/images/mirissa.jpg",
    "/images/cooking.jpg",
    "/images/spa.jpg",
    "/images/yala.jpg",
    "/images/nine-arch-bridge.jpg",
    "/images/moody-mountains.jpg",
    "/images/sigiriya-vibrant.jpg",
    "/images/mirissa-clear.jpg",
    "/images/galle.jpg", // Repeat some to fill grid
    "/images/sigiriya.jpg",
    "/images/ella.jpg",
];

export const GallerySection = () => {
    return (
        <section className="bg-transparent pb-24 -mt-10 relative z-20 overflow-hidden" style={{ pointerEvents: 'none' }}>
            <div className="container mx-auto px-4" style={{ pointerEvents: 'auto' }}>

                {/* The "Card" Container mimicking the reference style */}
                <div className="relative w-full bg-[#F5F5F7] rounded-[3rem] overflow-hidden min-h-[500px] flex flex-col items-center pt-20 pb-40 px-6 shadow-2xl border-t border-white/50">

                    {/* Background Soft Gradients */}
                    <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white via-transparent to-white/50 pointer-events-none z-10" />

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center z-20 mb-12 relative"
                    >
                        <h2 className="font-heading font-black text-4xl md:text-6xl text-gray-900 uppercase tracking-tight leading-[0.9]">
                            Create Memories <br />
                            <span className="text-gray-400">With Ceylon Trips</span>
                        </h2>
                    </motion.div>

                    {/* The Grid of Images */}
                    <div className="w-full max-w-4xl relative z-0 mt-8">
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 opacity-60 mask-image-faded">
                            {galleryImages.map((src, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                                    className="aspect-square relative rounded-2xl overflow-hidden shadow-sm"
                                >
                                    <Image
                                        src={src}
                                        alt={`Gallery ${idx}`}
                                        fill
                                        className="object-cover hover:scale-110 transition-transform duration-500"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Fade Overlay for the grid edges to mimic reference */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F7] via-transparent to-[#F5F5F7] z-10 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7] via-transparent to-[#F5F5F7]/0 z-10 pointer-events-none" />
                    </div>

                    {/* Central Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-56 md:w-64"
                    >
                        <div className="relative rounded-[3rem] border-[8px] border-gray-900 bg-black overflow-hidden shadow-2xl h-[400px] md:h-[400px] ring-1 ring-gray-900/50 mb-20">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-black rounded-b-2xl z-40"></div>

                            {/* Status Bar Mock (Time, Wifi, Battery) */}
                            <div className="absolute top-2 w-full px-6 flex justify-between items-center z-40 text-white text-[10px] font-bold">
                                <span>9:41</span>
                                <div className="flex gap-1">
                                    <div className="w-4 h-2.5 bg-white rounded-[2px]" />
                                    <div className="w-0.5 h-1 bg-white" />
                                </div>
                            </div>

                            {/* Screen Content - A Video or Hero Image */}
                            <div className="relative w-full h-full bg-gray-800">
                                <Image
                                    src="/images/mirissa-clear.jpg" // Using a nice clear vertical-ish image or fit cover
                                    alt="Phone Display"
                                    fill
                                    className="object-cover"
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                    </div>
                                </div>

                                {/* UI Overlay Bottom */}
                                <div className="absolute bottom-6 left-0 w-full px-6 flex flex-col gap-2">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-8 h-8 rounded-full bg-white/20 border border-white/50 backdrop-blur-sm overflow-hidden relative">
                                            <Image src="/images/sigiriya.jpg" fill alt="User" className="object-cover" />
                                        </div>
                                        <span className="text-white text-xs font-bold shadow-black drop-shadow-md">@ceylontrips</span>
                                    </div>
                                    <p className="text-white text-sm font-medium leading-tight drop-shadow-md">
                                        Discover the untouched beauty of Sri Lanka. 🌿✨ #Travel #Ceylon
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Subtitle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-8 text-center z-20 px-4"
                    >
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs md:text-sm">
                            The more you explore, the more you discover yourself.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
