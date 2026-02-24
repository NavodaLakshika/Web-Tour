"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { experiences } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin, Calendar, Compass,
    ArrowRight, Star,
    Waves,
    ChevronLeft, ChevronRight, Map as MapIcon,
    Clock, Plane, Search, Filter,
    Play, Pause, Sparkles, Heart, Gauge
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const CATEGORIES = ["All", "Adventure", "Wildlife", "Culinary", "Wellness", "Festivals", "Heritage"];

export default function ExperiencesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [liveExperiences, setLiveExperiences] = useState<any[]>([]);

    React.useEffect(() => {
        const fetchLiveExperiences = async () => {
            const { data, error } = await supabase
                .from('experiences')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setLiveExperiences(data);
            }
        };

        fetchLiveExperiences();
    }, []);

    const allExperiences = useMemo(() => {
        return liveExperiences;
    }, [liveExperiences]);

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

    const filteredExperiences = useMemo(() => {
        return allExperiences.filter(exp => {
            const categoryMatch = selectedCategory === "All" || exp.category === selectedCategory;
            const searchMatch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exp.description.toLowerCase().includes(searchQuery.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [selectedCategory, searchQuery, allExperiences]);

    const totalPages = Math.ceil(filteredExperiences.length / ITEMS_PER_PAGE);

    const paginatedExperiences = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredExperiences.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredExperiences, currentPage]);

    // Reset pagination when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    return (
        <main className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Navbar />

            {/* 1. PREMIUM HERO SECTION */}
            <section className="relative h-screen w-full overflow-hidden bg-white text-foreground selection:bg-primary selection:text-white">
                {/* Full Bleed Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-full overflow-hidden">
                        <Image
                            src="/images/ex-new.jpg"
                            alt="Unforgettable Experiences"
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
                                    <span className="hover:text-white transition-colors cursor-default">Experiences</span>
                                </div>

                                <h1 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                                    Sri Lanka <br />
                                    <span className="text-white text-3xl md:text-5xl italic font-art lowercase tracking-normal">Experiences</span>
                                </h1>

                                <div className="flex flex-col gap-6 mt-12">
                                    <p className="text-white/90 text-sm md:text-lg font-art leading-relaxed max-w-2xl">
                                        Sri Lanka offers a multitude of signature experiences that range from exhilarating, adrenaline pumping adventures to relaxing and invigorating meditations. The country’s natural beauty makes it a haven for wildlife enthusiasts who yearn to observe birds, animals and marine life in their natural habitats.
                                    </p>
                                    <p className="text-white/70 text-sm md:text-lg font-sans leading-relaxed max-w-2xl italic">
                                        Read on to discover the many unique and authentic experiences that tap into diverse interests, helping you to truly connect with your passions.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. SIGNATURE EXPERIENCES COLLECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-16 space-y-32 rounded-[10px">
                    {[
                        {
                            title: "Whale Watching",
                            desc: "Sri Lanka is an island that is blessed with an eclectic mix of exotic beauty, culture and history that has made it the perfect place to relax and experience nature. The waters that surround the island contain such a diverse marine ecosystem, making it one of the best places in the world to observe blue whales and sperm whales in their natural habitat.",
                            image: "/images/mirissa-beach.jpg",
                            tag: "Marine Discovery"
                        },
                        {
                            title: "Wildlife Safari",
                            desc: "Sri Lanka is an island filled with exotic beauty and lush greenery, complemented by many interesting species of endemic wildlife. Nature reserves, such as the Yala National Park, Minneriya National Park, Udawalawe National Park offer thrilling safari encounters with leopards, elephants and rare birds in their thousands throughout the year.",
                            image: "/images/yala.jpg",
                            tag: "Wild Encounters"
                        },
                        {
                            title: "Diving and Snorkelling",
                            desc: "The island of Sri Lanka is surrounded by a number of sites that are great for scuba diving and snorkelling. If you are a beginner, or have never done diving before, there are PADI diving centres that can assist and guide you to make the most of your adventures among historic shipwrecks and vibrant coral reefs.",
                            image: "/images/mirissa-clear.jpg",
                            tag: "Underwater Realm"
                        },
                        {
                            title: "Surfing in Sri Lanka",
                            desc: "With perfect beaches for fun in the sun, the island has become a hotspot for travellers looking to experience some exhilarating water sports. Surfing in Sri Lanka is just one of those experiences that have become popular among travellers looking for world-class point breaks and consistent swells.",
                            image: "/images/two.jpg",
                            tag: "Ocean Adrenaline"
                        },
                        {
                            title: "Ayurveda",
                            desc: "Ayurveda is not just a wellness trend that has been appropriated by those touting expensive spa treatments. Instead, it is a type of alternative medicine that has historic roots in the Indian subcontinent, and dates back at least 5,000 years. Wellness centres around the country provide therapies based on ancient Ayurvedic practices and healing methods.",
                            image: "/images/spa.jpg",
                            tag: "Holistic Healing"
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className={`flex flex-col lg:flex-row gap-12  lg:gap-24 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            <div className="w-full lg:w-1/2">
                                <div className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-square overflow-hidden group rounded-[10px]">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/5" />
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px w-8 bg-secondary" />
                                        <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] ">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <h2 className="font-heading text-4xl md:text-6xl font-black text-black uppercase tracking-tighter leading-none ">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-500 text-lg font-art leading-relaxed ">
                                        {item.desc}
                                    </p>
                                </div>

                                <motion.div whileHover={{ x: 10 }}>
                                    <Link href="/contact" className="inline-flex items-center gap-4 group">
                                        <span className="text-black font-black text-[10px] uppercase tracking-[0.5em] group-hover:text-secondary transition-colors">
                                            READ MORE
                                        </span>
                                        <div className="w-10 h-px bg-black/20 group-hover:bg-secondary group-hover:w-16 transition-all duration-500" />
                                        <ArrowRight className="w-4 h-4 text-black group-hover:text-secondary transition-colors" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. ADDITIONAL EXPERIENCES GRID */}
            <section className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="font-heading text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                                More to <span className="text-secondary italic font-art lowercase tracking-normal">Discover</span>
                            </h2>
                            <p className="text-gray-500 max-w-2xl mx-auto font-art text-lg">
                                From misty mountain treks to ancestral tea rituals, explore more facets of the island soul.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
                            {paginatedExperiences.map((exp, idx) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (idx % 3) * 0.1 }}
                                    className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-[10px]"
                                >
                                    <div className="relative h-64 overflow-hidden ">
                                        <Image
                                            src={exp.image}
                                            alt={exp.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110 rounded-[10px]"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-[9px] font-black uppercase tracking-widest text-black rounded-[1px]">
                                                {exp.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-secondary">
                                                <MapPin className="w-3 h-3" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{exp.location}</span>
                                            </div>
                                            <h3 className="font-heading text-xl font-black text-black uppercase group-hover:text-secondary transition-colors line-clamp-1">
                                                {exp.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-500 text-sm font-art line-clamp-2 min-h-[40px]">
                                            {exp.description}
                                        </p>
                                        <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                                            <div className="flex items-center gap-4 text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-[10px] font-black">{exp.duration}</span>
                                                </div>
                                            </div>
                                            <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest text-black hover:text-secondary transition-colors underline underline-offset-4 decoration-secondary/30">
                                                Inquire
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Numeric Pagination */}
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
                                    <ChevronLeft size={20} />
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
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
