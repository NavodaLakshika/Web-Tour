"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { destinations as staticDestinations } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import {
    MapPin, Star, Calendar, Clock,
    Compass, ArrowLeft, ShieldCheck,
    Waves, Landmark, Camera, Utensils
} from "lucide-react";

export default function DestinationDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [destination, setDestination] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDestination = async () => {
            setIsLoading(true);

            // 1. Check static data first
            const staticMatch = staticDestinations.find(d => d.slug === slug);
            if (staticMatch) {
                setDestination(staticMatch);
                setIsLoading(false);
                return;
            }

            // 2. If not found, check Supabase
            const { data, error } = await supabase
                .from('destinations')
                .select('*')
                .eq('slug', slug)
                .single();

            if (!error && data) {
                setDestination(data);
            }
            setIsLoading(false);
        };

        fetchDestination();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                    <p className="font-heading font-black text-primary uppercase tracking-[0.3em] text-xs">Unveiling Story...</p>
                </div>
            </div>
        );
    }

    if (!destination) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-8 text-center">
                <Compass className="w-16 h-16 text-primary/10 mb-8" />
                <h1 className="text-4xl font-heading font-black text-primary uppercase mb-4">Lost in Legend</h1>
                <p className="text-gray-500 mb-8 max-w-md">This destination hasn't been written into our chronicles yet.</p>
                <Link href="/destinations" className="bg-primary text-white px-8 py-4 font-black uppercase tracking-widest text-[11px] hover:bg-secondary hover:text-primary transition-all shadow-xl">
                    Back to Registry
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FDFBF7] selection:bg-primary selection:text-white">
            <Navbar />

            {/* 1. HERO SECTION */}
            <section className="relative h-[85vh] w-full overflow-hidden">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24">
                    <div className="container mx-auto">
                        <Link href="/destinations" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group">
                            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Explorer</span>
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="space-y-4 max-w-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-px bg-accent" />
                                    <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px]">{destination.region} — {destination.interest}</span>
                                </div>
                                <h1 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-none">
                                    {destination.name}
                                </h1>
                            </div>

                            <div className="flex gap-6 pb-2">
                                <div className="text-center">
                                    <span className="text-white text-3xl font-black block leading-none">{destination.rating}</span>
                                    <span className="text-white/40 text-[9px] uppercase font-black tracking-widest">Score</span>
                                </div>
                                <div className="w-px h-10 bg-white/20 mt-2" />
                                <div className="text-center">
                                    <span className="text-white text-3xl font-black block leading-none">{destination.price === '$0' ? 'Free' : destination.price}</span>
                                    <span className="text-white/40 text-[9px] uppercase font-black tracking-widest">Access</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. CONTENT SECTION */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                        {/* Main Description */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-heading font-black text-primary uppercase tracking-tight">Chronicles of {destination.name}</h2>
                                <p className="text-gray-600 text-lg leading-relaxed font-art">
                                    {destination.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 py-12 border-y border-primary/5">
                                <div className="flex gap-4">
                                    <Calendar className="text-accent shrink-0" size={24} />
                                    <div>
                                        <h4 className="text-[10px] font-black text-primary/30 uppercase tracking-widest mb-1">Golden Season</h4>
                                        <p className="text-sm font-bold text-primary">{destination.best_time}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <MapPin className="text-accent shrink-0" size={24} />
                                    <div>
                                        <h4 className="text-[10px] font-black text-primary/30 uppercase tracking-widest mb-1">District</h4>
                                        <p className="text-sm font-bold text-primary">{destination.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Highlights */}
                        <div className="space-y-12">
                            <div className="bg-white p-10 rounded-[32px] shadow-2xl shadow-primary/5 border border-primary/5 space-y-8">
                                <h3 className="text-xl font-heading font-black text-primary uppercase tracking-tight">Key Insights</h3>

                                <div className="space-y-6">
                                    {[
                                        { icon: ShieldCheck, title: "UNESCO Heritage", val: destination.category === 'Historical' ? 'Verified' : 'Island Pride' },
                                        { icon: Clock, title: "Exploration Time", val: "3-4 Hours Recommended" },
                                        { icon: Camera, title: "Photography", val: "World Class Frames" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] flex items-center justify-center text-accent">
                                                <item.icon size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-primary/30 uppercase tracking-widest mb-0.5">{item.title}</p>
                                                <p className="text-xs font-black text-primary leading-none uppercase">{item.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full py-5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-secondary hover:text-primary transition-all shadow-xl shadow-primary/20">
                                    Add to Journey Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
