"use client";

import React, { useState, useMemo } from "react";
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
    Clock, Plane
} from "lucide-react";
import { Button } from "@/components/ui/button";

const REGIONS = ["All", "North", "South", "Central", "East", "West"];
const INTERESTS = ["All", "Beaches", "Cultural", "Nature", "Wildlife"];

export default function DestinationsPage() {
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [selectedInterest, setSelectedInterest] = useState("All");

    const filteredDestinations = useMemo(() => {
        return destinations.filter(dest => {
            const regionMatch = selectedRegion === "All" || dest.region === selectedRegion;
            const interestMatch = selectedInterest === "All" || dest.interest === selectedInterest;
            return regionMatch && interestMatch;
        });
    }, [selectedRegion, selectedInterest]);

    const topAttractions = useMemo(() => destinations.slice(0, 4), []);

    return (
        <main className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-primary selection:text-white">
            <Navbar />

            {/* 1. HERO SECTION */}
            <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
                <Image
                    src="/images/galle.jpg"
                    alt="Explore Sri Lanka"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-secondary text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-4 block drop-shadow-md">
                            The Jewel of the Ocean
                        </span>
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-wider mb-6 leading-tight">
                            Explore <br /> <span className="text-secondary italic font-serif lowercase tracking-normal">Destinations</span>
                        </h1>
                        <p className="text-lg md:text-xl font-light tracking-wide max-w-3xl mx-auto text-white/90 mb-10 leading-relaxed">
                            Discover the stunning landscapes, vibrant culture, and rich history of Sri Lanka. From golden beaches to ancient temples, every corner offers a new adventure.
                        </p>
                        <div className="flex justify-center gap-6">
                            <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-primary font-bold px-8 py-6">
                                View Map
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. FILTER & CATEGORIES SECTION */}
            <section className="py-20 bg-white border-b border-gray-100 sticky top-[80px] z-30 shadow-sm hidden md:block">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Region Filter */}
                        <div className="flex items-center gap-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Region</span>
                            <div className="flex gap-2">
                                {REGIONS.map(region => (
                                    <button
                                        key={region}
                                        onClick={() => setSelectedRegion(region)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${selectedRegion === region ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-primary'}`}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-200 hidden md:block" />

                        {/* Interest Filter */}
                        <div className="flex items-center gap-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Interest</span>
                            <div className="flex gap-2">
                                {INTERESTS.map(interest => (
                                    <button
                                        key={interest}
                                        onClick={() => setSelectedInterest(interest)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${selectedInterest === interest ? 'bg-secondary text-primary shadow-lg' : 'text-gray-500 hover:text-secondary'}`}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. DESTINATION GRID */}
            <section className="py-24 bg-[#FDFBF7]">
                <div className="container mx-auto px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedRegion + selectedInterest}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                        >
                            {filteredDestinations.map((dest, idx) => (
                                <motion.div
                                    key={dest.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group"
                                >
                                    <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl mb-6">
                                        <Image
                                            src={dest.image}
                                            alt={dest.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                                            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">
                                                {dest.region}
                                            </span>
                                            <span className="bg-secondary text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">
                                                {dest.interest}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-8 left-8 right-8 text-white">
                                            <h3 className="text-3xl font-heading font-black uppercase mb-2 leading-none">{dest.name}</h3>
                                            <div className="flex items-center gap-2 text-xs font-medium text-white/70 mb-4">
                                                <MapPin className="w-3.5 h-3.5 text-secondary" />
                                                {dest.location}
                                            </div>

                                            <div className="h-px w-full bg-white/20 mb-4 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

                                            <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4 text-secondary" />
                                                    <span className="text-[10px] uppercase font-bold tracking-wider">{dest.bestTime}</span>
                                                </div>
                                                <Link href={`/destinations/${dest.slug}`}>
                                                    <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-secondary transition-colors">
                                                        <ArrowRight className="w-5 h-5" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Attractions Detail */}
                                    <div className="px-4">
                                        <p className="text-gray-500 text-sm font-light leading-relaxed mb-4 line-clamp-2">
                                            {dest.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {dest.attractions.slice(0, 3).map((attr, i) => (
                                                <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-primary/40 flex items-center gap-1">
                                                    <ChevronRight className="w-2.5 h-2.5" />
                                                    {attr}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* 4. HIGHLIGHTS SECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                        <div className="max-w-xl text-center md:text-left">
                            <span className="text-secondary text-sm font-bold tracking-widest uppercase block mb-2">Unforgettable</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-primary leading-tight uppercase">Top <br /> <span className="italic font-serif lowercase tracking-normal">Attractions</span></h2>
                        </div>
                        <p className="text-gray-500 text-lg font-light max-w-sm text-center md:text-left">
                            These are the places that have captured the hearts of travelers for generations. Must-see icons of our island.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {topAttractions.map((dest, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-8 items-center bg-sand/10 rounded-[2.5rem] p-8 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-sand group">
                                <div className="relative w-full md:w-48 h-48 rounded-[2rem] overflow-hidden flex-shrink-0">
                                    <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-2xl font-bold font-heading text-primary">{dest.name}</h4>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                                            <span className="text-sm font-black">{dest.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm font-light leading-relaxed">{dest.description}</p>
                                    <Link href={`/destinations/${dest.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary group-hover:gap-4 transition-all">
                                        Learn More <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. INTERACTIVE MAP CONCEPT */}
            <section className="py-24 bg-[#FDFBF7]">
                <div className="container mx-auto px-4">
                    <div className="bg-primary rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                            <div className="space-y-8">
                                <span className="text-secondary text-sm font-bold tracking-widest uppercase block">Visual Discovery</span>
                                <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">Interactive <br /> Island Map</h2>
                                <p className="text-white/60 text-lg font-light leading-relaxed">
                                    Explore Sri Lanka from above. Click through our interactive map to discover regional highlights, travel distances, and hidden gems.
                                </p>
                                <Button className="rounded-full bg-secondary text-primary font-bold px-10 py-8 text-lg hover:scale-105 transition-all shadow-2xl">
                                    Launch Map Explorer
                                </Button>

                                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                                    <div>
                                        <span className="block text-3xl font-black text-secondary">8+</span>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Regions</span>
                                    </div>
                                    <div>
                                        <span className="block text-3xl font-black text-secondary">50+</span>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Hotspots</span>
                                    </div>
                                    <div>
                                        <span className="block text-3xl font-black text-secondary">UNESCO</span>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">8 Sites</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative aspect-square w-full max-w-md mx-auto">
                                {/* Simplified Silhouette approach or placeholder */}
                                <div className="absolute inset-0 bg-white/5 rounded-full animate-pulse" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <MapIcon className="w-48 h-48 text-secondary/20" />
                                    <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-secondary rounded-full animate-ping" />
                                    <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white rounded-full animate-ping" />
                                    <div className="absolute top-1/2 right-24 w-2 h-2 bg-secondary/50 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. SUGGESTED ITINERARIES / COMBINATIONS */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">Smart Travel</span>
                        <h2 className="text-4xl font-heading font-black text-primary leading-tight uppercase">Perfect <br /> <span className="text-secondary italic font-serif lowercase tracking-normal">Combinations</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-12 bg-sand/20 rounded-[3.5rem] flex flex-col justify-between group hover:bg-primary transition-all duration-700">
                            <div>
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm">
                                    <Compass className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-white transition-colors">Hill Country Classic</h3>
                                <p className="text-gray-500 font-light leading-relaxed mb-8 group-hover:text-white/60 transition-colors">Kandy → Nuwara Eliya → Ella. A 5-day journey through misty tea estates and waterfalls.</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                                <span>75 Miles</span>
                                <div className="w-1 h-1 bg-secondary rounded-full" />
                                <span>5 Days</span>
                            </div>
                        </div>

                        <div className="p-12 bg-secondary rounded-[3.5rem] flex flex-col justify-between group hover:bg-primary transition-all duration-700">
                            <div>
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm">
                                    <Waves className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-white transition-colors">The Southern Shores</h3>
                                <p className="text-gray-700 font-light leading-relaxed mb-8 group-hover:text-white/60 transition-colors">Bentota → Galle → Mirissa. Sun, surf, and historic colonial ramparts over 4 sun-soaked days.</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary group-hover:text-secondary">
                                <span>40 Miles</span>
                                <div className="w-1 h-1 bg-primary group-hover:bg-secondary rounded-full" />
                                <span>4 Days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. CALL TO ACTION */}
            <section className="py-24 bg-primary text-white text-center">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto space-y-10"
                    >
                        <Plane className="w-12 h-12 text-secondary/30 mx-auto" />
                        <h2 className="text-5xl md:text-7xl font-heading font-black uppercase leading-tight">Where will your <span className="text-secondary italic font-serif lowercase tracking-normal">story</span> begin?</h2>
                        <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                            Our team of local experts is ready to help you craft an itinerary that fits your own unique tale.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/plan">
                                <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-primary font-bold px-12 py-8 text-xl shadow-2xl transition-all hover:scale-105">Curate My Trip</Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/5 px-12 py-8 text-xl shadow-xl transition-all hover:scale-105">Speak to an Expert</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
