"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";

const spotlightTours = [
    {
        id: 1,
        title: "Tea Plantations",
        desc: "Lush green hills and world-famous Ceylon tea estates.",
        price: "$45",
        bg: "https://images.unsplash.com/photo-1564594985645-4427056e22e2?q=80&w=2832&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Sigiriya Rock",
        desc: "Ancient palace fortress located in the northern Matale District.",
        price: "$60",
        bg: "https://images.unsplash.com/photo-1588258524675-c6379f649de9?q=80&w=2832&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Beach Paradise",
        desc: "Golden sunsets and pristine beaches with swaying palms.",
        price: "$30",
        bg: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=2832&auto=format&fit=crop"
    }
];

export const Hero = () => {
    const [activeImageDetails, setActiveImageDetails] = useState(spotlightTours[1]); // Default to Sigiriya

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-primary selection:text-white" id="hero-section-main-image">
            {/* Background Image with Crossfade */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeImageDetails.bg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={activeImageDetails.bg}
                        alt={activeImageDetails.title}
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    {/* Minimal Gradient Overlay for Text Readability Only */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Grid Layout */}
            <div className="relative z-10 w-full h-full grid grid-cols-12">

                {/* Left Vertical Bar (Socials) */}
                <div className="hidden lg:flex col-span-1 border-r border-white/20 flex-col justify-end items-center pb-12 gap-8 z-20 bg-black/10 backdrop-blur-[2px]">
                    <Link href="#" className="transform -rotate-90 text-xs font-bold tracking-widest text-white hover:text-primary transition-colors mb-8 whitespace-nowrap">FOLLOW US</Link>
                    <div className="flex flex-col gap-6">
                        <Link href="#" className="text-white hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
                        <Link href="#" className="text-white hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
                        <Link href="#" className="text-white hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-sans text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl text-shadow-lg">
                            Wild & <br /> <span className="text-white">Wonderful</span>
                        </h1>

                        <p className="text-white text-lg md:text-xl max-w-md leading-relaxed mb-8 border-l-4 border-primary pl-6 drop-shadow-lg font-medium text-shadow-sm">
                            Explore the vivid colors of Sri Lanka. From golden beaches to lush green mountains, discover paradise on your terms.
                        </p>

                        <Link href="/destinations" className="inline-flex items-center gap-4 group">
                            <div className="h-14 px-8 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center uppercase font-bold tracking-widest text-sm rounded-sm text-white shadow-lg">
                                View All Tours
                            </div>
                            <div className="h-14 w-14 bg-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform rounded-sm shadow-lg shadow-primary/20">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Right Side Cards */}
                <div className="hidden lg:flex col-span-5 flex-col justify-center gap-6 px-12 pr-20">
                    {spotlightTours.map((tour, index) => (
                        <motion.div
                            key={tour.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                            className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
                            onClick={() => setActiveImageDetails(tour)}
                        >
                            {/* Glass Card Background */}
                            <div className={`absolute inset-0 backdrop-blur-md border transition-all duration-300 z-0 rounded-3xl ${activeImageDetails.id === tour.id ? 'bg-white/20 border-white/40' : 'bg-black/40 border-white/10 hover:bg-black/60'}`} />

                            <div className="relative z-10 flex p-4 gap-6 items-center">
                                {/* Thumbnail */}
                                <div className="relative h-24 w-32 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                                    <Image src={tour.bg} alt={tour.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 py-2">
                                    <h3 className="text-xl font-bold text-white mb-1 truncate drop-shadow-md">{tour.title}</h3>
                                    <p className="text-xs text-gray-200 line-clamp-2 mb-3 leading-relaxed font-medium drop-shadow-sm">{tour.desc}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary-300 font-bold drop-shadow-md">{tour.price} <span className="text-[10px] text-gray-200 font-normal ml-1 uppercase">/ Person</span></span>
                                        <ArrowRight className={`h-4 w-4 transition-all ${activeImageDetails.id === tour.id ? 'text-white translate-x-1' : 'text-white/70 group-hover:text-white group-hover:translate-x-1'}`} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};
