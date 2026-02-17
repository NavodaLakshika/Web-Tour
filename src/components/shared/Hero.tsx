"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Twitter, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SocialIcon } from "./SocialIcon";

// Updated data with local images
const spotlightTours = [
    {
        id: 1,
        title: "Tea of Sri Lanka",
        desc: "Experience the heritage of world-renowned Ceylon tea amidst the mist-covered green hills.",
        price: "$45",
        bg: "/images/tea.png",
        link: "/destinations/hill-country"
    },
    {
        id: 2,
        title: "Buddha Statue",
        desc: "Witness the spiritual serenity of majestic ancient stone carvings that stand as a testament to history.",
        price: "$60",
        bg: "/images/buddha.png",
        link: "/destinations/cultural-triangle"
    },
    {
        id: 3,
        title: "Nature of Sri Lanka",
        desc: "Journey through lush tropical landscapes and vibrant ecosystems unique to this paradise island.",
        price: "$30",
        bg: "/images/nature.jpg",
        link: "/destinations/nature"
    },
    {
        id: 4,
        title: "Sri Lanka Beach",
        desc: "Unwind on pristine golden sands bordered by the crystal clear turquoise waters of the Indian Ocean.",
        price: "$50",
        bg: "/images/beach.jpg",
        link: "/destinations/coastal"
    },
    {
        id: 5,
        title: "Baby Elephant in Sri Lanka",
        desc: "Encounter the gentle giants and playful calves in their natural sanctuary, a truly heart-warming experience.",
        price: "$15",
        bg: "/images/baby-elephant.jpg",
        link: "/destinations/wildlife"
    }
];

export const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(1); // Default to Sigiriya

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % spotlightTours.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + spotlightTours.length) % spotlightTours.length);
    };

    const activeTour = spotlightTours[activeIndex];

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-primary selection:text-white" id="hero-section-main-image">
            {/* Static Background Image - Framed to match 80% zoom feel */}
            <div className="absolute inset-0 w-full h-full p-2">
                <div className="relative w-full h-full overflow-hidden rounded-[2rem]">
                    <Image
                        src="/images/hero-couple.png"
                        alt="Ceylon Hero"
                        fill
                        className="object-cover object-center"
                        priority
                        quality={100}
                        sizes="100vw"
                    />

                    {/* Clean, subtle overlay for legibility without darkening the whole scene */}
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
            </div>

            {/* Grid Layout */}
            <div className="relative z-10 w-full h-full grid grid-cols-12">

                {/* Left Vertical Bar (Socials) - RESTORED & STYLED */}
                <div className="hidden lg:flex col-span-1 border-r border-white/20 flex-col justify-end items-center pb-12 gap-8 z-20 bg-black/10 backdrop-blur-[2px]">
                    <Link href="#" className="transform -rotate-90 text-xs font-bold tracking-widest text-white hover:text-primary transition-colors mb-8 whitespace-nowrap">FOLLOW US</Link>
                    <div className="flex flex-col gap-6 items-center">
                        <SocialIcon icon={Instagram} label="Instagram" color="#E1306C" href="#" tooltipPosition="right" />
                        <SocialIcon icon={Twitter} label="Twitter" color="#000000" href="#" tooltipPosition="right" />
                        <SocialIcon icon={Facebook} label="Facebook" color="#1877F2" href="#" tooltipPosition="right" />
                    </div>
                </div>

                {/* Main Content Area - RESTORED ORIGINAL FONTS & STYLES */}
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

                {/* Right Side Cards - NEW SLIDER DESIGN */}
                <div className="hidden lg:flex col-span-5 flex-col justify-center relative h-full">
                    {/* Carousel Container */}
                    <div className="relative w-full h-[450px] flex items-center justify-center perspective-1000">
                        {/* We render 3 items: Prev, Active, Next */}
                        <AnimatePresence mode="popLayout">
                            {(() => {
                                const visibleTours = [];
                                const N = spotlightTours.length;
                                // Get indices for prev, current, next
                                const prevIndex = (activeIndex - 1 + N) % N;
                                const nextIndex = (activeIndex + 1) % N;

                                // Order matters for z-index in standard flow, but we control it with motion
                                // Let's map them explicitly
                                const indices = [prevIndex, activeIndex, nextIndex];

                                return indices.map((idx, mapIndex) => {
                                    const tour = spotlightTours[idx];
                                    // position logic: 0=left, 1=center, 2=right
                                    const position = mapIndex === 1 ? 'center' : mapIndex === 0 ? 'left' : 'right';

                                    return (
                                        <motion.div
                                            key={tour.id}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                                x: position === 'left' ? -100 : position === 'right' ? 100 : 0
                                            }}
                                            animate={{
                                                opacity: position === 'center' ? 1 : 0.6,
                                                scale: position === 'center' ? 1 : 0.85,
                                                x: position === 'center' ? 0 : position === 'left' ? -200 : 200,
                                                zIndex: position === 'center' ? 20 : 10,
                                                filter: position === 'center' ? 'blur(0px)' : 'blur(2px)'
                                            }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            className="absolute top-1/2 -translate-y-1/2 w-[220px] h-[320px] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                                        >
                                            <div className="relative h-3/5 w-full">
                                                <Image
                                                    src={tour.bg}
                                                    alt={tour.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {/* Overlay for non-active cards */}
                                                {position !== 'center' && <div className="absolute inset-0 bg-black/40" />}

                                                {/* Active Badge */}
                                                {position === 'center' && (
                                                    <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg">
                                                        Popular
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 p-5 flex flex-col justify-between bg-white text-black relative">
                                                <div>
                                                    <h3 className="font-heading text-lg font-bold mb-2 text-black line-clamp-1">{tour.title}</h3>
                                                    <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">
                                                        {tour.desc}
                                                    </p>
                                                </div>

                                                <Link href={tour.link || "#"} className="flex items-center gap-2 group/btn mt-2">
                                                    <span className="text-xs font-bold text-black group-hover/btn:text-primary transition-colors">Read More</span>
                                                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover/btn:bg-primary transition-colors">
                                                        <ArrowRight className="w-3 h-3" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                });
                            })()}
                        </AnimatePresence>

                        {/* Navigation Buttons for Slider */}
                        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 flex gap-4 z-30">
                            <button
                                onClick={handlePrev}
                                className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-10 h-10 rounded-full border border-white/20 bg-primary flex items-center justify-center text-white hover:bg-primary-light transition-all shadow-lg shadow-primary/30"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
