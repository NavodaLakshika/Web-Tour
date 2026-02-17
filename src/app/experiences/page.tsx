"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { experiences } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock, ArrowRight, Gauge,
    Calendar, MapPin, Star,
    Heart,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["All", "Adventure", "Wildlife", "Culinary", "Wellness", "Festivals"];

export default function ExperiencesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredExperiences = useMemo(() => {
        return experiences.filter(exp =>
            selectedCategory === "All" || exp.category === selectedCategory
        );
    }, [selectedCategory]);

    const featuredExperience = experiences[0]; // The Train journey

    return (
        <main className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-primary selection:text-white">
            <Navbar />

            {/* 1. HERO SECTION */}
            <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
                <Image
                    src="/images/train.jpg"
                    alt="Unforgettable Experiences"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-secondary text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-4 block drop-shadow-md">
                            Beyond the Ordinary
                        </span>
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-wider mb-6 leading-tight">
                            Feel the <br /> <span className="text-secondary italic font-serif lowercase tracking-normal">Island Pulse</span>
                        </h1>
                        <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-white/90 mb-10 leading-relaxed">
                            Sri Lanka offers a wide range of experiences – from thrilling safaris and scenic hikes to cultural festivals and cooking classes. Find the adventure that fits your travel style.
                        </p>
                        <div className="flex justify-center gap-6">
                            <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-primary font-bold px-10 py-7 text-lg shadow-2xl">
                                Explore All Acts
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. FEATURED EXPERIENCE SECTION */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl z-10"
                            >
                                <Image src={featuredExperience.image} alt={featuredExperience.title} fill className="object-cover" />
                                <div className="absolute top-8 left-8 bg-secondary text-primary px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg">
                                    Must-Do Experience
                                </div>
                            </motion.div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-secondary">
                                <Sparkles className="w-5 h-5" />
                                <span className="font-bold tracking-widest uppercase text-sm">Recommended for you</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-heading font-black text-primary uppercase leading-tight">
                                {featuredExperience.title}
                            </h2>
                            <p className="text-gray-500 text-lg font-light leading-relaxed">
                                {featuredExperience.description}
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-secondary" />
                                    <div>
                                        <span className="block text-[10px] uppercase text-gray-400 font-bold">Duration</span>
                                        <span className="font-bold text-primary">{featuredExperience.duration}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Gauge className="w-5 h-5 text-secondary" />
                                    <div>
                                        <span className="block text-[10px] uppercase text-gray-400 font-bold">Intensity</span>
                                        <span className="font-bold text-primary">{featuredExperience.difficulty}</span>
                                    </div>
                                </div>
                            </div>

                            <Button className="rounded-full bg-primary text-white px-10 py-7 font-bold hover:scale-105 transition-all">
                                Book This Adventure
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. INTERACTIVE CATEGORIES & GRID */}
            <section className="py-24 bg-[#FDFBF7]">
                <div className="container mx-auto px-4">
                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <span className="text-secondary text-sm font-bold tracking-widest uppercase block mb-2 text-center md:text-left">Catered to you</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-primary leading-tight uppercase text-center md:text-left">Discover Your <br /> <span className="italic font-serif lowercase tracking-normal text-secondary">moment</span></h2>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 bg-white p-2 rounded-full shadow-sm border border-sand">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-primary'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Experience Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                        >
                            {filteredExperiences.map((exp, idx) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-sand"
                                >
                                    <div className="relative h-72 overflow-hidden">
                                        <Image src={exp.image} alt={exp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                                            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">
                                                {exp.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-6 left-6 bg-primary/80 backdrop-blur-sm text-secondary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                            {exp.price}
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-4">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <MapPin className="w-3.5 h-3.5 text-secondary" />
                                            {exp.location}
                                        </div>
                                        <h3 className="text-2xl font-bold font-heading text-primary leading-tight group-hover:text-secondary transition-colors">
                                            {exp.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2">
                                            {exp.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-secondary" />
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{exp.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Gauge className="w-3.5 h-3.5 text-secondary" />
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{exp.difficulty}</span>
                                                </div>
                                            </div>
                                            <Link href="/contact">
                                                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* 4. FESTIVALS & SPECIAL EVENTS (Horizontal Scroll) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                        <div className="text-center md:text-left">
                            <span className="text-secondary text-sm font-bold tracking-widest uppercase block mb-2">Timing is Everything</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-primary leading-tight uppercase">Cultural <br /> <span className="italic font-serif lowercase tracking-normal">Spectacles</span></h2>
                        </div>
                        <p className="text-gray-500 text-lg font-light max-w-sm text-center md:text-left">
                            Synchronize your visit with the island's most vibrant celebrations.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-12 scrollbar-hide">
                        {[
                            { name: "Kandy Esala Perahera", date: "July - August", img: "/images/kandy.jpg" },
                            { name: "Sinhala & Tamil New Year", date: "April 13th - 14th", img: "/images/sigiriya-vibrant.jpg" },
                            { name: "Vesak Festival", date: "Full Moon in May", img: "/images/mirissa-clear.jpg" }
                        ].map((fest, idx) => (
                            <div key={idx} className="relative min-w-[300px] md:min-w-[400px] h-[500px] rounded-[3rem] overflow-hidden group flex-shrink-0">
                                <Image src={fest.img} alt={fest.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                <div className="absolute bottom-10 left-10">
                                    <div className="flex items-center gap-2 text-secondary mb-2">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest">{fest.date}</span>
                                    </div>
                                    <h4 className="text-3xl font-heading font-bold text-white uppercase">{fest.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION */}
            <section className="py-32 bg-primary text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                    <Image src="/images/sigiriya.jpg" fill alt="Texture" className="object-cover" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto space-y-10"
                    >
                        <Heart className="w-12 h-12 text-secondary/30 mx-auto" />
                        <h2 className="text-5xl md:text-7xl font-heading font-black uppercase leading-tight">Ready to live <br /> your <span className="text-secondary italic font-serif lowercase tracking-normal">own adventure?</span></h2>
                        <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                            Create memories that will last a lifetime. Our team will help you craft the perfect experience.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/plan">
                                <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-primary font-bold px-12 py-8 text-xl shadow-2xl transition-all hover:scale-105">Curate My Moments</Button>
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
