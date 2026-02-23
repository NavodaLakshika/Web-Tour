"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { destinations } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin, Calendar, Compass,
    ArrowRight, Star,
    Waves,
    ChevronRight, Map as MapIcon,
    Clock, Plane, Search, Filter,
    Play, Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const REGIONS = ["All", "North", "South", "Central", "East", "West"];
const INTERESTS = ["All", "Beaches", "Cultural", "Nature", "Wildlife"];

export default function DestinationsPage() {
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [selectedInterest, setSelectedInterest] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [liveDestinations, setLiveDestinations] = useState<any[]>([]);

    React.useEffect(() => {
        const fetchLiveDestinations = async () => {
            const { data, error } = await supabase
                .from('destinations')
                .select('*');

            if (!error && data) {
                // Filter out destinations that already exist in static data by slug to avoid duplicates
                const staticSlugs = destinations.map(d => d.slug);
                const uniqueLive = data.filter(d => !staticSlugs.includes(d.slug));
                setLiveDestinations(uniqueLive);
            }
        };

        fetchLiveDestinations();
    }, []);

    const allDestinations = useMemo(() => {
        return [...destinations, ...liveDestinations];
    }, [liveDestinations]);

    const togglePlayback = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const filteredDestinations = useMemo(() => {
        return allDestinations.filter(dest => {
            const regionMatch = selectedRegion === "All" || dest.region === selectedRegion;
            const interestMatch = selectedInterest === "All" || dest.interest === selectedInterest;
            const searchMatch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dest.region.toLowerCase().includes(searchQuery.toLowerCase());
            return regionMatch && interestMatch && searchMatch;
        });
    }, [allDestinations, selectedRegion, selectedInterest, searchQuery]);

    const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);

    const paginatedDestinations = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredDestinations.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredDestinations, currentPage]);

    // Reset pagination when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedRegion, selectedInterest, searchQuery]);

    return (
        <main className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Navbar />

            {/* 1. PREMIUM HERO SECTION - Home Page Style Framing */}
            <section className="relative h-screen w-full overflow-hidden bg-white text-foreground selection:bg-primary selection:text-white">
                {/* Full Bleed Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-full overflow-hidden">
                        <Image
                            src="/images/Adventure_Awaits_at_Sigiriya.png"
                            alt="Adventure Awaits at Sigiriya"
                            fill
                            className="object-cover"
                            priority
                            quality={100}
                        />

                        {/* Atmospheric Overlay */}
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                    </div>
                </div>

                <div className="relative z-10 w-full h-full flex items-center">
                    <div className="container mx-auto px-6 lg:px-16 pt-20">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4 text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <span>/</span>
                                    <span className="hover:text-white transition-colors cursor-default">Destinations</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="h-px w-12 bg-secondary" />
                                </div>

                                <h1 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                                    Destinations
                                </h1>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-12">
                                    <p className="text-white/80 text-sm md:text-2xl font-art leading-relaxed max-w-lg">
                                        Discover 2,500 years of sacred heritage through the monarchic eras of the Cultural Triangle and the coastal colonial forts of the south.
                                    </p>

                                    <div className="h-20 w-px bg-white/20 hidden md:block" />

                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-3xl tracking-tighter">50+</span>
                                        <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">Handpicked Spots</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>


            </section>

            {/* 2. EXPLORATION FILTERS - Cinematic Style */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="flex flex-col gap-12">
                        {/* Title Section - Centered */}
                        <div className="space-y-4 flex flex-col items-center text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-10 h-px bg-secondary" />
                                <span className="text-gray-600 font-black uppercase tracking-[0.4em] text-[18px]">Customize Exploration</span>
                                <div className="w-10 h-px bg-secondary" />
                            </div>
                        </div>

                        {/* Filters Row - Split Left/Right */}
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 w-full">

                            {/* Region Selector (Left) */}
                            <div className="space-y-4 w-full lg:w-auto">
                                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 flex items-center gap-2">
                                    <MapPin className="w-3 h-3" /> Select Region
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {REGIONS.map(region => (
                                        <button
                                            key={region}
                                            onClick={() => setSelectedRegion(region)}
                                            className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all duration-500 ${selectedRegion === region
                                                ? 'bg-black text-white border-black shadow-[4px_4px_0px_rgba(0,0,0,0.1)] translate-y-[-2px]'
                                                : 'bg-transparent text-black border-black/10 hover:border-black'
                                                }`}
                                        >
                                            {region}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Search Box (Center/Bottom on mobile, Center on Desktop) */}
                            <div className="relative group w-full lg:w-64 h-12 flex items-end pb-1 border-b border-foreground/10 focus-within:border-foreground transition-colors mx-auto lg:mx-0">
                                <Search className="w-3 h-3 text-foreground/20 group-focus-within:text-foreground mb-1" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="SEARCH..."
                                    className="w-full bg-transparent pl-3 text-[10px] font-black text-foreground uppercase tracking-[0.2em] outline-none placeholder:text-foreground/20"
                                />
                                <div className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-secondary group-focus-within:w-full transition-all duration-1000" />
                            </div>

                            {/* Experience Selector (Right) */}
                            <div className="space-y-4 w-full lg:w-auto text-left lg:text-right">
                                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 flex items-center justify-start lg:justify-end gap-2">
                                    <Compass className="w-3 h-3" /> Experience Type
                                </h4>
                                <div className="flex flex-wrap justify-start lg:justify-end gap-1.5">
                                    {INTERESTS.map(interest => (
                                        <button
                                            key={interest}
                                            onClick={() => setSelectedInterest(interest)}
                                            className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all duration-500 ${selectedInterest === interest
                                                ? 'bg-secondary text-black border-secondary shadow-[4px_4px_0px_rgba(212,175,55,0.2)] translate-y-[-2px]'
                                                : 'bg-transparent text-black border-black/10 hover:border-black'
                                                }`}
                                        >
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. DESTINATION MASONRY GRID - Inspiration Style */}
            <section className="py-4 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedRegion + selectedInterest}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            // 12-column grid for maximum flexibility
                            className="grid grid-cols-1 md:grid-cols-12 gap-3"
                        >
                            {paginatedDestinations.map((dest, idx) => {
                                // Logic to create varying horizontal/vertical spans like the reference
                                // Pattern: 2-item row (8,4), 3-item row (4,4,4), 2-item row (4,8)
                                const rowPattern = idx % 5;
                                let colSpan = "md:col-span-4";

                                if (rowPattern === 0) colSpan = "md:col-span-8 h-[500px]"; // Large Wide
                                else if (rowPattern === 1) colSpan = "md:col-span-4 h-[500px]"; // Tall
                                else if (rowPattern === 2) colSpan = "md:col-span-4 h-[400px]"; // Square
                                else if (rowPattern === 3) colSpan = "md:col-span-4 h-[400px]"; // Square
                                else if (rowPattern === 4) colSpan = "md:col-span-4 h-[400px]"; // Square (Text Card)

                                // Let's make every 5th card a "Quote/Text" card like the reference
                                const isTextCard = rowPattern === 5; // Adjustment: keep it all images for now as per data

                                return (
                                    <motion.div
                                        key={dest.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (idx % 3) * 0.1 }}
                                        className={`group relative overflow-hidden bg-gray-900 ${colSpan} cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700`}
                                    >
                                        <Image
                                            src={dest.image}
                                            alt={dest.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                        />

                                        {/* Subtle Vignette */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                        {/* Content - Clean Minimalism */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                            <div className="space-y-4">
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-secondary">
                                                        {dest.interest} — {dest.region}
                                                    </span>
                                                    <h3 className="text-2xl md:text-3xl font-heading font-black text-white leading-tight uppercase tracking-tighter">
                                                        {dest.name}
                                                    </h3>
                                                </div>

                                                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                                    <div className="flex items-center gap-2">
                                                        <Star className="w-3 h-3 text-secondary fill-secondary" />
                                                        <span className="text-[10px] font-black tracking-widest">{dest.rating}</span>
                                                    </div>
                                                    <div className="h-px w-8 bg-white/30" />
                                                    <Link href={`/destinations/${dest.slug}`} className="text-[9px] font-black uppercase tracking-[0.3em] hover:text-secondary transition-colors underline underline-offset-8 decoration-secondary/50">
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Play/Feature Indicator like reference */}
                                        {idx % 3 === 0 && (
                                            <div className="absolute top-8 left-8">
                                                <div className="w-10 h-10 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center">
                                                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent translate-x-[2px]" />
                                                </div>
                                            </div>
                                        )}

                                        {idx === 0 && (
                                            <div className="absolute top-8 right-8">
                                                <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20">
                                                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Featured</span>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="mt-20 flex justify-center items-center gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${currentPage === 1
                                    ? 'border-black/5 text-black/20 cursor-not-allowed'
                                    : 'border-black/10 text-black hover:border-black hover:bg-black hover:text-white'
                                    }`}
                            >
                                <ChevronRight className="w-5 h-5 rotate-180" />
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 text-[11px] font-black transition-all ${currentPage === i + 1
                                            ? 'text-black border-b-2 border-secondary'
                                            : 'text-black/30 hover:text-black'
                                            }`}
                                    >
                                        {(i + 1).toString().padStart(2, '0')}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${currentPage === totalPages
                                    ? 'border-black/5 text-black/20 cursor-not-allowed'
                                    : 'border-black/10 text-black hover:border-black hover:bg-black hover:text-white'
                                    }`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {filteredDestinations.length === 0 && (
                        <div className="py-32 text-center space-y-4">
                            <Compass className="w-12 h-12 text-black/10 mx-auto" />
                            <h3 className="text-2xl font-heading font-black text-black/20 uppercase tracking-tighter">No spots found in this category</h3>
                        </div>
                    )}
                </div>
            </section>

            {/* 4. CINEMATIC VIDEO SECTION - Enhanced Quality Processing */}
            <section className="relative h-screen w-full overflow-hidden bg-white">
                {/* 1. Cinematic Post-Processing Filters */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.85] contrast-[1.1] saturate-[1.1] transition-all"
                >
                    <source src="/video/tovideo.mp4" type="video/mp4" />
                </video>

                {/* Subtle Darkening Overlay */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                {/* 2. QUALITY ENHANCEMENT LAYERS */}
                {/* Micro-Grain Overlay (Hides compression banding & noise) */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                {/* Radial Vignette (Adds depth and hides corner artifacts) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

                {/* Sharp Geometric Effect - Right Side */}
                <div className="absolute top-0 right-0 h-full w-[40%] bg-black/30 backdrop-blur-[5px] hidden lg:block"
                    style={{ clipPath: 'polygon(100% 0, 0 0, 30% 100%, 100% 100%)' }}>
                    <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent" />
                    <div className="absolute top-0 left-0 w-2 h-full bg-secondary shadow-[0_0_30px_rgba(212,175,55,0.6)]" />
                </div>

                <div className="relative z-10 container mx-auto px-6 lg:px-16 h-full flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center gap-12">

                        {/* Left: Epic Typography */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="space-y-6"
                        >
                            <h2 className="text-5xl md:text-7xl font-art text-white leading-[1.1] max-w-xl lowercase">
                                Legends of Ceylon <br /> Come Alive
                            </h2>

                            <motion.button
                                onClick={togglePlayback}
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-4 group"
                            >
                                <span className="text-white font-black text-[10px] uppercase tracking-[0.5em] group-hover:text-secondary transition-colors">
                                    {isPlaying ? 'PAUSE STORY' : 'RESUME STORY'}
                                </span>
                                <div className="w-10 h-px bg-white/40 group-hover:bg-secondary group-hover:w-16 transition-all duration-500" />
                                <div className="w-2 h-2 border-t-2 border-r-2 border-white rotate-45 group-hover:border-secondary transition-colors" />
                            </motion.button>
                        </motion.div>

                        {/* Right: Functional Gold Button (Smaller) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-center lg:justify-end pr-0 lg:pr-32"
                        >
                            <button
                                onClick={togglePlayback}
                                className="relative group transition-transform duration-500 active:scale-90"
                            >
                                {/* Glow */}
                                <div className="absolute inset-[-15px] rounded-full bg-secondary/20 blur-xl group-hover:bg-secondary/30 transition-all duration-700 animate-pulse" />

                                {/* Button Body - Now smaller (w-48 instead of w-80) */}
                                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#B8860B] p-2 shadow-[0_0_40px_rgba(212,175,55,0.3)] border-2 border-black/10">

                                    {/* Ornamental Pattern Ring */}
                                    <div className="absolute inset-2 text-black/20 flex items-center justify-center opacity-40">
                                        <div className="w-full h-full rounded-full border-[8px] border-double border-current" />
                                    </div>

                                    {/* Inner Core */}
                                    <div className="w-full h-full rounded-full flex items-center justify-center bg-transparent border-2 border-black/5 shadow-inner relative">
                                        {isPlaying ? (
                                            <div className="flex gap-2">
                                                <div className="w-3 h-10 bg-black/80 rounded-sm" />
                                                <div className="w-3 h-10 bg-black/80 rounded-sm" />
                                            </div>
                                        ) : (
                                            <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[35px] border-l-black/80 border-b-[20px] border-b-transparent translate-x-1.5" />
                                        )}
                                    </div>

                                    {/* Radial Shadows */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/30 rounded-full" />
                                </div>
                            </button>
                        </motion.div>

                    </div>
                </div>


            </section>

            {/* Simple Animated Story Sentence - One Line Professional Style */}
            <section className="p-5 bg-white overflow-hidden border-y border-black/[0.03]">
                <div className="flex whitespace-nowrap overflow-hidden">
                    <div
                        className="flex gap-20 items-center animate-[marquee_100s_linear_infinite]"
                        style={{
                            animationPlayState: isPlaying ? 'running' : 'paused',
                            width: 'max-content'
                        }}
                    >
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex gap-20 items-center pr-20">
                                <span className="text-2xl md:text-3xl font-heading font-black text-gray-400 uppercase tracking-[0.3em]">whispers of the hill country</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                <span className="text-2xl md:text-3xl font-heading font-black text-gray-300 uppercase tracking-[0.3em]">misty mountains and golden shores</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                <span className="text-2xl md:text-3xl font-heading font-black text-gray-400 uppercase tracking-[0.3em]">wild soul of the ceylon jungles</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                <span className="text-2xl md:text-3xl font-heading font-black text-gray-300 uppercase tracking-[0.3em]">nature&apos;s unwritten poetry</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                `}</style>
            </section>

            <Footer />
        </main>
    );
}
