"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const galleryImages = [
    { src: "/images/buddha.png", alt: "Ancient Buddha Statue at Polonnaruwa Temple", location: "Polonnaruwa" },
    { src: "/images/beach.jpg", alt: "Pristine sandy beach with turquoise water at Mirissa", location: "Mirissa" },
    { src: "/images/hero-couple.png", alt: "Couple enjoying the scenic sunset in the Sri Lankan mountains", location: "Ella Hills" },
    { src: "/images/nature.jpg", alt: "Lush green tropical rainforest and mountains", location: "Sinharaja" },
    { src: "/images/tea.png", alt: "Traditional tea picker in the emerald tea estates", location: "Nuwara Eliya" },
    { src: "/images/baby-elephant.jpg", alt: "Rescue baby elephant at Pinnawala Orphanage", location: "Pinnawala" },
    { src: "/images/yala.jpg", alt: "Wild leopard prowling in Yala National Park", location: "Yala National Park" },
    { src: "/images/sigiriya-vibrant.jpg", alt: "Aerial view of the majestic Sigiriya Lion Rock fortress", location: "Sigiriya" },
];

export const GallerySection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    return (
        <section className="bg-transparent pb-24 -mt-10 relative z-20 overflow-hidden" style={{ pointerEvents: 'none' }}>
            <div className="container mx-auto px-4" style={{ pointerEvents: 'auto' }}>

                {/* The "Card" Container mimicking the reference style */}
                <div className="relative w-full bg-[#F5F5F7] rounded-[3rem] overflow-hidden min-h-[700px] md:min-h-[500px] flex flex-col items-center pt-16 md:pt-20 pb-40 px-6 shadow-2xl border-t border-white/50">

                    {/* Background Soft Gradients */}
                    <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white via-transparent to-white/50 pointer-events-none z-10" />

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center z-40 mb-12 relative"
                    >
                        <h2 className="font-heading font-black text-3xl md:text-5xl text-gray-900 uppercase tracking-tight leading-[1.1] md:leading-[0.9]">
                            Create Memories <br />
                            <span className="text-gray-600 text-4xl md:text-4xl italic font-art capitalize tracking-normal block mt-2">With Ceylon Trips</span>
                        </h2>
                    </motion.div>

                    {/* The Grid of Images */}
                    <div className="w-full max-w-4xl relative z-0 mt-8">
                        {/* Instagram Feed Header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="flex flex-col items-center gap-1 mb-8 text-gray-400"
                        >
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                                <span className="uppercase tracking-[0.3em] text-[9px] font-black">Tales from Travelers</span>
                            </div>
                            <span className="text-gray-900 font-bold text-sm">@ceylontrips</span>
                        </motion.div>

                        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 opacity-100 mask-image-faded">
                            {galleryImages.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                                    className="aspect-square relative rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                        <span className="text-[10px] text-white font-bold truncate w-full">{img.location}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Fade Overlay for the grid edges to mimic reference */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F7] via-transparent to-[#F5F5F7] z-10 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7] via-transparent to-[#F5F5F7]/0 z-10 pointer-events-none" />
                    </div>

                    {/* Central Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, x: "-50%", scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute bottom-40 md:bottom-30 left-1/2 z-30 w-56 md:w-64"
                    >
                        <div className="relative rounded-[3rem] border-[8px] border-gray-900 bg-black overflow-hidden shadow-2xl h-[400px] md:h-[420px] ring-1 ring-gray-900/50">
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

                            {/* Screen Content - A Functional Video Player */}
                            <div className="relative w-full h-full bg-gray-800 cursor-pointer" onClick={togglePlay}>
                                <video
                                    ref={videoRef}
                                    src="/video/slvideo.mp4"
                                    className="object-cover w-full h-full"
                                    loop
                                    playsInline
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                />

                                {/* Play Button Overlay - Visible when paused */}
                                {!isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all duration-300">
                                        <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-xl transform group-hover:scale-110 transition-transform">
                                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                        </div>
                                    </div>
                                )}

                                {/* Pause indicator on hover when playing (optional visual) */}
                                {isPlaying && (
                                    <div className="absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center bg-black/10 transition-opacity duration-300">
                                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                            <div className="flex gap-1.5">
                                                <div className="w-1.5 h-6 bg-white rounded-full" />
                                                <div className="w-1.5 h-6 bg-white rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                )}

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
                        className="absolute bottom-10 md:bottom-8 left-0 right-0 text-center z-20 px-4"
                    >
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-sm">
                            The more you explore, the more you discover yourself.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
